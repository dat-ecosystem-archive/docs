# Browser Dat

Dat is written in JavaScript, so naturally, it can work entirely in the browser! The great part about this is that as more peers connect to each other in their client, the site assets will be shared between users rather hitting any server.

This approach is similar to that used in Feross' [Web Torrent](http://webtorrent.io). The difference is that Dat links can be rendered live and read dynamically, whereas BitTorrent links are static. The original owner can update the files in the directory and all peers will receive the updates automatically.

Because dat-js uses webrtc, it can only connect to other browser clients. It is not possible for the dat-js library to connect to the UTP and UDP clients used in the Node.js versions.

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
var concat = require('concat-stream')

var clone = Dat()
clone.add(key, function (repo) {
  var readStream = repo.archive.createFileReadStream('hello.txt')
  concat(readStream, function (data) {
    console.log(data.toString()) // prints 'world'
  })
  // and do other things with the stream
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

var drive = hyperdrive(memdb())

var archive = drive.createArchive()
var link = archive.discoveryKey.toString('hex')

var swarm = webrtc(signalhub(link, DEFAULT_SIGNALHUBS))
swarm.on('peer', function (peer) {
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

```js
var hyperdrive = require('hyperdrive')
var drive = hyperdrive(<YOUR DATABASE HERE>, {file: <CONTENT DATABASE HERE>})
```

There are many different ways to piece modules together to create the storage infrastructure for a hyperdrive -- here are some tested examples:

### In-memory storage

When the user refreshes their browser, they will lose all previous keys and data. The user will no longer be able to write more data into the hyperdrive.

```js
var hyperdrive = require('hyperdrive')
var memdb = require('memdb')

var drive = hyperdrive(memdb())
var archive = drive.createArchive()
```

### Persistence with IndexedDB

When the user refreshes their browser, their keys will be stored and retrieved.

The best module to use for this is `level-browserify`:

```js
var hyperdrive = require('hyperdrive')
var level = require('level-browserify')

var drive = hyperdrive(level('./mydb'))
var archive = drive.createArchive()
```

This will store all of the hyperdrive metadata *as well as content* in the client's IndexedDB. This is pretty inefficient. You'll notice that with this method that *IndexedDB will start to become full and the hyperdrive database will stop working as usual*.

### Persistent metadata in IndexedDB with in-memory file content

If you use level-browserify to store file content, you will quickly notice performance issues with large files. Writes after about 3.4GB will become blocked by the browser. You can avoid this by using in-memory storage for the file content.

To do this, use [random-access-file-reader](https://github.com/mafintosh/random-access-file-reader) as the file writer and reader for the hyperdrive.

```js
var hyperdrive = require('hyperdrive')
var level = require('level-browserify')
var ram = require('random-access-memory')

var drive = hyperdrive(level('./mydb'))
var archive = drive.createArchive({
  file: ram
})
```

This works well for most cases until you want to write a file to hyperdrive that doesn't fit in memory.

### Writing large files from the filesystem to the browser

File writes are limited to the available memory on the machine. Files are buffered (read: copied) *into memory* while being written to the hyperdrive instance. This isn't ideal, but works as long as file sizes stay below system RAM limits.

To fix this problem, you can use [random-access-file-reader](https://github.com/mafintosh/random-access-file-reader) to read the files directly from the filesystem instead of buffering them into memory.

Here we will create a simple program that creates a file 'drag and drop' element on `document.body.` When the user drags files onto the element, pointers to them will be added to the `files` object.


```js
var drop = require('drag-drop')

var files = {}

drop(document.body, function (files) {
  files[files[0].name] = files[0]
})
```

Okay, that's pretty easy. Now let's add the hyperdrive. Hyperdrive needs to know what the pointers are, so when a peer asks for the file, it can read from the filesystem rather from memory. In other words, we are telling the hyperdrive which files it should index.

```js
var drop = require('drag-drop')
var reader = require('random-access-file-reader')
var hyperdrive = require('hyperdrive')
var memdb = require('memdb')

var files = {}

var drive = hyperdrive(memdb())

var archive = drive.createArchive({
  file: function (name) {
    return reader(files[name])
  }
})

drop(document.body, function (files) {
  files[files[0].name] = files[0]
  // will index the file using hyperdrive without reading the entire file into ram
  archive.append(files[0].name)
})
```

Come over to our community channels and ask a question. It's probably a good one and we should cover it in the documentation. Thanks for trying it out, and PRs always welcome!

[![#dat IRC channel on freenode](https://img.shields.io/badge/irc%20channel-%23dat%20on%20freenode-blue.svg)](http://webchat.freenode.net/?channels=dat)
[![datproject/discussions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/datproject/discussions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
