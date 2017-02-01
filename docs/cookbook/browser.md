# Browser Dat

Dat is written in JavaScript, so naturally, it can work entirely in the browser! The great part about this is that as more peers connect to each other in their client, the site assets will be shared between users rather hitting any server.

This approach is similar to that used in Feross' [Web Torrent](http://webtorrent.io). The difference is that Dat links can be rendered live and read dynamically, whereas BitTorrent links are static. In other words, the original owner can update a Dat and all peers will receive the updates automatically.

OK, now for the goods:

## Hyperdrive

For now, there isn't an easy dat implementation for the browser. We have a simpler interface for node at [dat-js](http://github.com/joehand/dat-js).  

If you want to get your hands dirty, here is the lower-level implementations to create a browser-based hyperdrive instance that will be compatible with dat.

Hyperdrive will save the metadata (small) and the content (potentially large) separately. You can control where both of these are saved and how they are retrieved. These tweaks have huge impact on performance, stability, and user experience, so it's important to understand the tradeoffs.

The first argument to `hyperdrive` will be the main database for all metadata and content. The `file` option can be supplied to specify how to read and write content data. If a `file` option is not supplied, the content will also be stored in the main database.

```js
var hyperdrive = require('hyperdrive')
var drive = hyperdrive(<YOUR DATABASE HERE>, {file: <CONTENT DATABASE HERE>})
```

### The most basic example

```js
var hyperdrive = require('hyperdrive')
var memdb = require('memdb')
var swarm = require('hyperdrive-archive-swarm')

var drive = hyperdrive(memdb())
var archive = drive.createArchive()

// joins the webrtc swarm
swarm(archive)

// this key can be used in another browser tab
console.log(archive.key)
```

That's it. Now you are serving a dat-compatible hyperdrive from the browser. In another browser tab, you can connect to the swarm and download the data by using the same code as above. Just make sure to reference the hyperdrive you created before by using `archive.key` as the first argument:

```js
var drive = hyperdrive(memdb())
var archive = drive.createArchive(<KEY HERE>)

// joins the webrtc swarm
swarm(archive)
```

For the full hyperdrive API and more examples, see the full [hyperdrive documentation](/hyperdrive).

## Patterns for browser-based data storage and transfer

There are a million different ways to store and retrieve data in the browser, and all have their pros and cons depending on the use case. We've compiled a variety of examples here to try to make it as clear as possible.

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
