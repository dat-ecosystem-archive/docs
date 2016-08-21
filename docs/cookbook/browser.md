# Dat in the browser

Dat is written in JavaScript, so naturally, it can work entirely in the browser! The great part about this is that as more peers connect to each other in their client, the site assets will be shared between users rather hitting any sever.

This approach is similar to that used in Feross' [Web Torrent](http://webtorrent.io). The difference is that Dat links can be rendered live and read dynamically, whereas BitTorrent links are static. In other words, the original owner can update a Dat and all peers will receive the updates automatically.

OK, now for the goods:

## Creating the Drive

First, we must create a hyperdrive instance that will be stored in the user's browser. Hyperdrive will save the metadata (small) and the content (potentially large) separately. You can control where both of these are saved and how they are retrieved. These tweaks have huge impact on performance, stability, and user experience, so it's important to understand the tradeoffs.

The first argument to `hyperdrive` will be the main database for all metadata and content. The `file` option can be supplied to specify how to read and write content data. If a `file` option is not supplied, the content will also be stored in the main database.

```js
var hyperdrive = require('hyperdrive')
var drive = hyperdrive(<YOUR DATABASE HERE>, {file: <CONTENT DATABASE HERE>})
```

#### In-memory storage and rendering

Characteristics:
  * When the user refreshes their browser, they will lose all previous keys and data. The user will no longer be able to write more data into the hyperdrive.
  * File writes are limited to the available memory on the machine.

```js
var hyperdrive = require('hyperdrive')
var memdb = require('memdb')

var drive = hyperdrive(memdb())
```

#### Writing from the filesystem (skipping memory on write)

TODO: see https://github.com/mafintosh/random-access-file-reader


#### Persistence with IndexedDB

Characteristics:

  * When the user refreshes their browser, their keys will be stored and retrieved.

The best module to use for this is `level-browserify`:

```js
var hyperdrive = require('hyperdrive')
var level = require('level-browserify')

var drive = hyperdrive(level('./mydb'))
```

Great! This will store all of the hyperdrive metadata *as well as content* in the client's IndexedDB.
