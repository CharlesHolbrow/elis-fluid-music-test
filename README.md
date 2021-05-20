**Re-implementing a test mix originally made with sox/python**

First make sure that you have `cybr` in your `$PATH`. You can [compile from source](https://github.com/fluid-music/cybr), or use the MacOS pkg installer or precompiled binary for Ubuntu x86-64 available on [github](https://github.com/fluid-music/cybr/releases/tag/v0.3.1). Run the server with:

```sh
cybr -f
```

Leave the `cybr` server running, and execute `run.js` from this repo in a new terminal tab:

```sh
git clone git@github.com:CharlesHolbrow/elis-fluid-music-test
cd elis-fluid-music-test
npm install
node run.js
```

This should generate two files

1. `result.RPP` which can be opened in Reaper
2. `result.wav`

See [./run.js](./run.js) for details.

