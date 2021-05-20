const fluid = require('fluid-music')
const path = require('path')

// audio-files.js was auto-generated with the `afactory` CLI utility that you
// can install with `$ npm i -g @fluid-music/utils`. The main fluid-music
// library is intended to be lightweight and usable in the browser, so it avoids
// reading or parsing audio files. Instead, it is the user's responsibility to
// supply info about the audio file to the `FluidAudioFile` constructor. At
// minimum you should supply a `.path` and a `info.duration`, for example:
// ```
// audioFile = new fluid.techniques.AudioFile({ path: '/yea.wav', info: { duration: 1} })
// ```
// In practice, I typically auto-generate AudioFile constructors using the
// `afactory` utility. This is a good approach when you know what files you want
// to work with before writing a script.
//
// To construct AudioFile instances at runtime, use the `music-metadata` npm
// package to parse audio files and generate the `.info` objects that will be
// passed in to the AudioFile constructor.
const audioFiles = require('./audio-files')
const techniques = audioFiles['elis-set-creation-tool']['src1']

techniques['bed.wav'].gainDb = -3 // adjust the gain for an audio file

// We want to play these audio files from the beginning to the end. The "OneShot"
// terminology is borrowed from the samplers like "Kontakt" 
for (const [filename, audioFile] of Object.entries(techniques)) {
  audioFile.mode = fluid.AudioFileMode.OneShot
}

const session  = new fluid.FluidSession({}, [
  { name: 'main', children: [
    { name: 'leads', gainDb: -1 },
    { name: 'music' },
    { name: 'vox', gainDb: 1 },
  ]}
])

// The source audio files already have fades, so we don't need to add them, but
// this is how to add fades to an AudioFile technique:
// techniques['intro.wav'].fadeInSeconds = 0.1

const voxStartSeconds = techniques['intro.wav'].getSourceDurationSeconds()
const outroStartSeconds = techniques['voice.wav'].getSourceDurationSeconds() + voxStartSeconds
const musicStartSeconds = techniques['outro.wav'].getSourceDurationSeconds() + outroStartSeconds

session.useTechnique(techniques['intro.wav'], { track: 'leads' })
session.useTechnique(techniques['bed.wav'], { track: 'music', startTimeSeconds: voxStartSeconds })
session.useTechnique(techniques['voice.wav'], { track: 'vox', startTimeSeconds: voxStartSeconds })
session.useTechnique(techniques['outro.wav'], { track: 'leads', startTimeSeconds: outroStartSeconds })

// The easiest way to do gain automation would be to use
// fluid.plugins.RoughRider3Vst2. For this to work, you would need to install
// the (free) RoughRiderCompressor, scan plugins to restart the cybr server
// `cybr --scan-plugins; cybr -f`, and then put the plugin in a track
// initializer's `.plugins` array like:
// ```
// const compressor = new fluid.plugins.RoughRider3Vst2({ externalSidechainEnable: 1, ...params }).sidechainWith('vox')
// const session = new fluid.FluidSession({}, [
//   { name: 'music', plugins: [compressor] },
//   { name: 'vox' },
//   ...otherTracks,
// ])
// ```
//
// If you want more precise control over the gain, but don't want to use a VST
// compressor, you can use track gain automation. The gain below is a little
// arbitrary, but it does show how gain automation works. Another way to make
// the music duck under the speech is to use a audio feature extractor like
// essentia.js (more performant) or meyda.js (easier to use) to get the dynamic
// envelope of the speech, and then use that data to insert automation points
// on the 'music' track.
const tGainMinus2 = new fluid.techniques.TrackGainAutomationRamp(-2)
const tGainUnity = new fluid.techniques.TrackGainAutomationRamp(0)
session.useTechnique(tGainMinus2, { track: 'music', startTimeSeconds: 0, durationSeconds: voxStartSeconds })
session.useTechnique(tGainUnity, { track: 'music', startTimeSeconds: voxStartSeconds, durationSeconds: 1 })
// Note that There are two different techniques for gain automation:
// TrackGainAutomation and TrackGainAutomationRamp. The 'Ramp' version inserts
// two automation points determined by startTimeSeconds, and durationSeconds,
// where the standard version inserts one automation point at durationSeconds.

session.finalize()

async function run() {
  // Because the session does not include any VST plugins, we can generate a
  // reaper session even if the cybr server is not running
  await session.saveAsReaperFile('result.RPP')

  // To render an audio file, the cybr server needs to be running. Download a
  // release, or compile from https://github.com/fluid-music/cybr, then
  // `$ cybr -f`
  await session.sendToServer()

  // Ask the server to render the result
  const client = new fluid.Client()
  const outputFileName = path.join(__dirname, 'result.wav')
  await client.send(fluid.cybr.global.save(outputFileName))
}

run()
  .then(() => console.log('done'))
  .catch(e => { throw e })
