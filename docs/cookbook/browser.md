# Browser Dat

Dat is written in JavaScript, so naturally, it can work entirely in the browser! The great part about this is that as more peers connect to each other in their client, the site assets will be shared between users rather hitting any server.

This approach is similar to that used in Feross' [Web Torrent](http://webtorrent.io). The difference is that Dat links can be rendered live and read dynamically, whereas BitTorrent links are static. The original owner can update the files in the directory and all peers will receive the updates automatically.

## WebRTC Usage Notes

**Important**: dat-js uses WebRTC, so it can only connect to other WebRTC clients. It is not possible for the dat-js library to connect directly clients using other protocols. All other Dat applications use non-WebRTC protocols ([see this FAQ for more info](https://docs.datproject.org/faq#does-dat-use-webrtc)). Non-browser clients can connect dats peer-to-peer via webrtc modules, such as [electron-webrtc](https://github.com/mappum/electron-webrtc), or use proxies via websockets, http, or other client-server protocols.

Due to WebRTC's less than stellar performance - Dat has focused on creating solid networking using other protocols. We may integrate WebRTC if performance improves and it becomes easier to run in non-browser interfaces (though we'd prefer using [more performant options](https://github.com/noffle/web-udp) in the browser, if they develop).

OK, now for the goods.

## Install

Embed the following script [dat.min.js](https://cdn.jsdelivr.net/dat/6.2.0/dat.min.js) on the page:
```
<script type="text/javascript" src="dat.min.js"></script>
```

You can also use the jsdelivr CDN for faster load speeds:

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/dat/6.2.0/dat.min.js"></script>
```

This provides a `Dat` prototype on the `window` object.

### Browserify

Or use Node.js in the browser with [browserify](http://github.com/substack/node-browserify), which lets you use node.js style require() to organize your browser code using npm.

```
npm install dat-js
```

Then use `dat-js` like this:

```
var Dat = require('dat-js')
```

## Quick Examples

### Sharing data

```js
var dat = Dat()
dat.add(function (repo) {
  var writer = repo.archive.createFileWriteStream('hello.txt')
  writer.write('world')
  writer.end(function () { replicate(repo.key) })
})
```

### Downloading data

```js
var Dat = require('dat-js')

var clone = Dat()
clone.add(key, function (repo) {
  repo.archive.readFile('hello.txt', function (err, data) {
    console.log(data.toString()) // prints 'world'
  })
})
```

The `repo.archive` is a [hyperdrive](http://github.com/mafintosh/hyperdrive) instance, which manages all of the files. A hyperdrive archive has a bunch of simple methods including only getting the files and byte ranges you want from a particular repository.

For the full hyperdrive API and more examples, see the full [hyperdrive documentation](/hyperdrive).

## Downloading only what you need

You might be asking 'Is it possible to index into a subset of a dat dataset?' Most datasets are too large for browsers, and we probably only want a subset of them.

You can do this by using `sparse` mode, which make it only download content that the peer asks for. To do this, simply pass `{sparse: true}` when you create the dat:

```js
var Dat = require('dat-js')

var dat= Dat()
dat.add(key, {sparse: true}, function (repo) {
  // etc..
})
```

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

## Storage API for metadata and content

Hyperdrive is the underlying database that runs dat.

Hyperdrive will save the metadata (small) and the content (potentially large) separately. You can control where both of these are saved and how they are retrieved. These tweaks have huge impact on performance, stability, and user experience, so it's important to understand the tradeoffs.

There are a million different ways to store and retrieve data in the browser, and all have their pros and cons depending on the use case. We've compiled a variety of examples here to try to make it as clear as possible.

The first argument to `hyperdrive` will be the main database for all metadata and content. The `file` option can be supplied to specify how to read and write content data. If a `file` option is not supplied, the content will also be stored in the main database.

There are many different ways to piece modules together to create the storage infrastructure for a hyperdrive -- here are some tested examples:

### Writing large files from the filesystem to the browser

File writes are limited to the available memory on the machine. Files are buffered (read: copied) *into memory* while being written to the hyperdrive instance. This isn't ideal, but works as long as file sizes stay below system RAM limits.

To fix this problem, you can use [random-access-file-reader](https://github.com/mafintosh/random-access-file-reader) to read the files directly from the filesystem instead of buffering them into memory.

Come over to our community channels and ask a question. It's probably a good one and we should cover it in the documentation. Thanks for trying it out, and PRs always welcome!

[![#dat IRC channel on freenode](https://img.shields.io/badge/irc%20channel-%23dat%20on%20freenode-blue.svg)](http://webchat.freenode.net/?channels=dat)
[![datproject/discussions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/datproject/discussions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
