const path = require('path')
const { AudioFile } = require('fluid-music').techniques
module.exports = {
  "elis-set-creation-tool": {
    "src1": {
      "bed.wav": new AudioFile({ path: path.join(__dirname, path.normalize("elis-set-creation-tool/src1/bed.wav")), info: {"tagTypes":[],"trackInfo":[],"container":"WAVE","codec":"PCM","bitsPerSample":16,"sampleRate":44100,"numberOfChannels":2,"bitrate":352800,"lossless":true,"numberOfSamples":2625185,"duration":59.52800453514739} }),
      "breaking_news_music.mp3": new AudioFile({ path: path.join(__dirname, path.normalize("elis-set-creation-tool/src1/breaking_news_music.mp3")), info: {"tagTypes":["ID3v2.3"],"trackInfo":[],"lossless":false,"container":"MPEG","codec":"MPEG 1 Layer 3","sampleRate":44100,"numberOfChannels":2,"bitrate":320000,"codecProfile":"CBR","numberOfSamples":5587200,"duration":126.6938775510204} }),
      "intro.wav": new AudioFile({ path: path.join(__dirname, path.normalize("elis-set-creation-tool/src1/intro.wav")), info: {"tagTypes":[],"trackInfo":[],"container":"WAVE","codec":"PCM","bitsPerSample":16,"sampleRate":44100,"numberOfChannels":2,"bitrate":352800,"lossless":true,"numberOfSamples":165265,"duration":3.7475056689342403} }),
      "outro.wav": new AudioFile({ path: path.join(__dirname, path.normalize("elis-set-creation-tool/src1/outro.wav")), info: {"tagTypes":["exif","ID3v2.3"],"trackInfo":[],"container":"WAVE","codec":"PCM","bitsPerSample":16,"sampleRate":44100,"numberOfChannels":2,"bitrate":352800,"lossless":true,"numberOfSamples":130743,"duration":2.9646938775510203} }),
      "voice.wav": new AudioFile({ path: path.join(__dirname, path.normalize("elis-set-creation-tool/src1/voice.wav")), info: {"tagTypes":[],"trackInfo":[],"container":"WAVE","codec":"PCM","bitsPerSample":16,"sampleRate":24000,"numberOfChannels":1,"bitrate":48000,"lossless":true,"numberOfSamples":1424448,"duration":59.352} }),
    },
  },
};
