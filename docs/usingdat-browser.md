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

## Quick Examples

### Sharing data

```js
var dat = Dat()

var repo = dat.create()
var writer = repo.archive.createWriteStream('hello.txt')
writer.write('world')
writer.end()
```

The `repo.archive` is a [hyperdrive](http://github.com/mafintosh/hyperdrive) instance, which manages all of the files. A hyperdrive archive has a bunch of simple methods including only getting the files and byte ranges you want from a particular repository.

You can now pass the URL of the dat, found at `repo.url`, to another peer, so they can download the data.

### Downloading data

```js
var Dat = require('dat-js')

var clone = Dat()
var repo = clone.get(url)
repo.archive.readFile('hello.txt', function (err, data) {
  console.log(data.toString()) // prints 'world'
})
```


## Downloading everything or only what you need

You might be asking 'Is it possible to index into a subset of a dat dataset?' Most datasets are too large for browsers, and we probably only want a subset of them.

You can do this by using `sparse` mode, which makes it only download content that the peer asks for. This is actually enabled by default and you can opt-into downloading the entire archive by passing `{sparse: false}` when you create the dat:

```js
var Dat = require('dat-js')

var dat= Dat()
var fullRepo = dat.get(url, {sparse: false})

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
