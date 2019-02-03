# Dat Storage Modules

## List of Modules

There is an ever-growing list of modules that the community has built to power Dat integrations with third party protocols and services like Google Drive, FTP and beyond.

You can view the list or submit your own at the [Awesome Dat Storage Modules List](https://github.com/datproject/awesome-dat#storage-modules).

## Using Storage Modules

All storage modules conform to our Abstract Storage API, and can be passed as an option when creating a Dat:

```js
var DatHTTP = require('dat-http') // our third party storage module
var Dat = require('dat-node')

var storage = DatHTTP('http://localhost:9988')
Dat('./, function (err, dat) {
  // all metadata will be stored in ./mydat/.dat
  // but all content will use HTTP
})
```

You can also pass a storage module as the first argument to the constructor of a Dat (or a Hyperdrive) to use that storage for all files in the Dat:

```js
var DatHTTP = require('dat-http') // our third party storage module
var Dat = require('dat-node')

var storage = DatHTTP('http://localhost:9988')
Dat(storage, function (err, dat) {
  // no local files/folders will be created
  // all files (metadata and content) will use HTTP
})
```

The default storage module (used if you just pass a string as the first argument to either Dat or Hyperdrive) is called [dat-storage](https://github.com/datproject/dat-storage) and uses the local filesystem.

## Abstract Storage API

If you want to write your own storage module you only need to implement the Abstract Storage API. To see example code using this API, refer to the [random-access-memory](https://github.com/mafintosh/random-access-memory/blob/master/index.js) module.

Here are the required methods a storage provider must implement (even if their methods just call the callback and do nothing else).

### var storage = new Storage(filename, opts)

When you pass the storage module into Dat or Hyperdrive it will be initialized with the signature `(filename, opts)`. Many storage instances will be made, one for each filename. The filename is passed as the first argument. This first argument can be ignored if the filename is not relevant to your storage module (this is the case with random-access-memory).

Options is an object to specify special options for the storage provider. Options is currently not passed in by Dat or Hyperdrive but individual storage modules may use it for their own specific settings.

### open(callback)

Initializes the storage module to ensure it is ready to begin receiving read/write requests. When ready, calls `callback` with `()` if nothing went wrong or with `(error)` if something went wrong.

### write(offset, buffer, callback)




