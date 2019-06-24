---
id: browser-intro
title: Browser Dat
---

**We've just released a NEW!! version of [dat-js](https://github.com/datproject/dat-js). Take a look and let us know how you use it!**

Dat is written in JavaScript, so naturally, it can work entirely in the browser! The great part about this is that as more peers connect to each other in their client, the site assets will be shared between users rather hitting any server.

This approach is similar to that used in Feross' [Web Torrent](http://webtorrent.io). The difference is that Dats can be rendered live and read dynamically, whereas BitTorrent links are static. The original owner of a Dat can update the files in the directory and all peers will receive the updates automatically.

## Connecting to non-browser peers

dat-js primarily uses WebRTC, so it prioritizes connections to other browser peers that are also using WebRTC. All other Dat applications use non-WebRTC protocols ([see this FAQ for more info](getting-started-faq.md)). Non-browser clients can connect dats peer-to-peer via webrtc modules, such as [electron-webrtc](https://github.com/mappum/electron-webrtc), or use proxies via websockets, http, or other client-server protocols.

In order for the dat-js library to connect to clients that aren't in the browser, we recommend using [dat-gateway](https://github.com/garbados/dat-gateway/). Deploy your own gateway if you expect a lot of traffic to your application.

A gateway works by having the client open a [websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) to the gateway, and have the gateway reach out to the rest of the dat network in order to fetch data from peers and send it down the websocket connection to dat-js. The gateway acts as a fallback and only gets used after dat-js has tried to connect to WebRTC peers first. This reduces gateway bandwidth constraints and keeps most of the traffic peer to peer.

There is an example gateway deployed at [gateway.mauve.moe](https://gateway.mauve.moe/).

OK, now for the goods.

## Install

Embed the following script [dat.min.js](https://bundle.run/dat-js@8) on the page:
```html
<script type="text/javascript" src="dat.min.js"></script>
```

You can also use [packd](https://bundle.run/) to have it generate the bundle on the fly:

```html
<script type="text/javascript" src="https://bundle.run/dat-js@8"></script>
```

This provides a `datJS` prototype on the `window` object.

```js
var Dat = window.datJS 
```

### Browserify

Or use Node.js in the browser with [browserify](https://github.com/browserify/browserify), which lets you use node.js style require() to organize your browser code using npm.

```
npm install dat-js
```

Then use `dat-js` like this:

```js
var Dat = require('dat-js')
```

And build a bundle with browserify, assuming your file is called `index.js` like this:

```
browserify ./index.js > bundle.js
```

Then include a script tag pointing at your `bundle.js`:

```
<script type="text/javascript" src="bundle.js"></script>
```


#### Getting data from a remote dat

You can load a Dat archive using it's `read key`. Dat-js will reach out to the P2P network and start loading the metadata into memory. From there you can invoke [hyperdrive](https://www.npmjs.com/package/hyperdrive) methods to read the data.

```js
var Dat = require('dat-js')

var dat = new Dat()
var archive = dat.get('dat://SOME_ARCHIVE_URL')

archive.readFile('hello.txt', function (err, data) {
  console.log(data)
})

var readStream = archive.createReadStream('hello.txt')
readStream.on('data', console.log)
```

#### Persisting a created dat and loading it from storage

By default, when you create a new Dat archive with Dat-js, it will be erased after you refresh the page. In order to keep it around for the next time the user loads the page, you need to make sure to enable the `persist` flag, and save a copy of the `url` read key to someplace like [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

```js
var Dat = require('dat-js')

var dat = new Dat()

var archive = dat.create({
  // Set this flag so that the data is persisted to the browser rather than memory
  persist: true
})

archive.writeFile('/example.txt', 'Hello World!', () => {
  // Save it for later
  localStorage.setItem('My_Repo', archive.url)
})

// OR as a stream:
var ws = archive.createWriteStream()
ws.write('Hello World!')
ws.end()

// Next time your app loads

var archive = dat.get(localStorage.getItem('My_Repo'), {
  persist: true
})

archive.readFile('/example.txt', 'utf-8', (err, data) => {
  console.log(`It's still there: ${data}`)
})
```

## API

#### `var dat = new Dat([options])`

Creates a new dat object. The options passed here will be default for any dats created using the `add` method.

 * `options`: any options you can pass to [mafintosh/hyperdrive](https://github.com/mafintosh/hyperdrive). These options will become default for all dats. It also gets passed as options into [discovery-swarm-web](https://github.com/RangerMauve/discovery-swarm-web). In addition it has the following:
  * `persist`: Whether the data should persist locally or load in memory. Default: `false` (memory only). This uses [random-access-web](https://github.com/RangerMauve/random-access-web) for persistence to choose the best storage layer for the current browser.
  * `db`: Pass in the [random-access-storage](https://github.com/random-access-storage/random-access-storage) instance to use. (overrides the `persist` option)
  * `id`: The ID to use when replicating hyperdrives

### `dat.get(url, [options])`

Adds a new dat with the given url. Joins the appropriate swarm for that url and begins to upload and download data. If the dat was already added, it will return the existing instance. One gotcha is that dat-js doesn't support DNS resolution yet. As such you'll need to use the actual archive key for loading websites. `dat-js` adds a `url` field to the archive, which contains the [read key](https://docs.datproject.org/docs/concepts#distributed-network), but you can see the rest of the APIs available in the [hyperdrive](https://www.npmjs.com/package/hyperdrive) docs.

 * `url`: Either a `dat://` url or just the public key in string form.
 * `options`: These options will override any options given in the Dat constructor.

### `dat.create([options])`

Creates a new dat, wait for it to be `ready` before trying to access the url. Make sure to save the archive `url` somewhere and enable `persist: true` so you can access it again later!

* `options`: These options will override any options given in the Dat constructor.

### `dat.has(url)`

Returns whether a given url has been loaded already.

### Properties

#### `dat.archives`

Array of dat archives that are currently loaded

### Events

#### `archive`

Fired every time a new archive is loaded.

#### `close`

Fired when dat is finished closing, including swarm and database.


## Downloading everything or only what you need

You might be asking 'Is it possible to index into a subset of a dat dataset?' Most datasets are too large for browsers, and we probably only want a subset of them.

You can do this by using `sparse` mode, which makes it only download content that the peer asks for. This is actually enabled by default and you can opt-into downloading the entire archive by passing `{sparse: false}` when you create the dat:

```js
var Dat = require('dat-js')

var dat= Dat()
var fullArchive = dat.get(url, {sparse: false})

// etc.
```

<!--

// TODO: Gonna leave this out for now and work on it last, there might still be changes for how signaling and peer discovery works.

## Under the hood

Let's look under the hood of `dat-js` to see how a simple lower-level implementation can be built to create a browser-based dat.

Here's the most simple example using the underlying modules directly:

```js
var webrtc = require('webrtc-swarm')
var signalhub = require('signalhub')
var hyperdrive = require('hyperdrive')
var memdb = require('memdb')
var pump = require('pump')

var DEFAULT_SIGNALHUBS = 'https://signalhub.mafintosh.com'

var archive = hyperdrive()
var link = archive.discoveryKey.toString('hex')

var swarm = webrtc(signalhub(link, DEFAULT_SIGNALHUBS))
swarm.on('peer', function (conn) {
  var peer = archive.replicate({
    upload: true,
    download: true
  })
  pump(conn, peer, conn)
})
```

That's it. Now you are serving a dat-compatible hyperdrive from the browser. In another browser tab, you can connect to the swarm and download the data by using the same code as above. Just make sure to reference the archive you created before by using `archive.key` as the first argument:

-->

## Storage API for metadata and content

Hyperdrive is the underlying database that runs dat.

Hyperdrive will save the metadata (small) and the content (potentially large) separately. You can control where both of these are saved and how they are retrieved. These tweaks have huge impact on performance, stability, and user experience, so it's important to understand the tradeoffs.

There are a million different ways to store and retrieve data in the browser, and all have their pros and cons depending on the use case. We've compiled a variety of examples here to try to make it as clear as possible.

You can pass in the specific implementation with the `db` parameter when initializing dat-js. By default, dat-js uses [random-access-memory](https://www.npmjs.com/package/random-access-memory) which is fast, but gets cleared when you refresh the page.

There are many different ways to piece modules together to create the storage infrastructure for a hyperdrive -- here are some tested examples:

### Writing large files from the filesystem to the browser

File writes are limited to the available memory on the machine. Files are buffered (read: copied) *into memory* while being written to the hyperdrive instance. This isn't ideal, but works as long as file sizes stay below system RAM limits.

To fix this problem, you can use [random-access-file-reader](https://github.com/mafintosh/random-access-file-reader) to read the files directly from the filesystem instead of buffering them into memory.

### Writing files to IndexedDB in the browser

[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) is a low-level key-value database that's supported by all the major browsers. It can be used to persist data for your dat archives across page refreshes and tabs using the [random-access-idb](https://www.npmjs.com/package/random-access-idb) module.

You can decide to have dat archives persist to memory by default and only load certain ones through idb:

```js
var storage = require('random-access-idb')('dats')
var Dat = require('dat-js')

var dat = new Dat()

var persistedRepo = dat.get(url, {
  db: storage
})
```

## Get in touch!

Come over to our community channels and ask a question. It's probably a good one and we should cover it in the documentation. Thanks for trying it out, and PRs always welcome!

[![#dat IRC channel on freenode](https://img.shields.io/badge/irc%20channel-%23dat%20on%20freenode-blue.svg)](http://webchat.freenode.net/?channels=dat)
[![datproject/discussions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/datproject/discussions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
