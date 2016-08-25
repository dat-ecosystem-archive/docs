# Build with Dat

In this guide, we will show how to develop applications with the Dat ecosystem. The Dat ecosystem is very modular making it easy to develop custom applications using Dat.

For any Dat application, there are three essential modules you will start with: 

1. [hyperdrive](https://npmjs.org/hyperdrive) for file synchronization and versioning
2. [hyperdrive-archive-swarm](https://npmjs.org/hyperdrive-archive-swarm) helps discover and connect to peers over local networks and the internet
3. A [LevelDB](https://npmjs.org/level) compatible database for storing metadata.

The [Dat CLI](https://npmjs.org/dat) module itself combines these modules and wraps them in a command-line API. These modules can be swapped out for a similarly compatible module, such as switching LevelDb for [MemDB](https://github.com/juliangruber/memdb) (which we do in the first example). More details on how these module work together are available in [How Dat Works](how-dat-works.md).

## Getting Started

You will need node and npm installed to build with Dat. [Read more](https://github.com/maxogden/dat/blob/master/CONTRIBUTING.md#development-workflow) about our development work flow to learn how we manage our module dependencies during development.

## Module #1: Download a File

Our first module will download files from a Dat link entered by the user. View the code for this module on [Github](https://github.com/joehand/diy-dat-examples/tree/master/module-1).

```bash
mkdir module-1 && cd module-1
npm init
npm install --save hyperdrive memdb hyperdrive-archive-swarm
touch index.js
```

For this example, we will use [memdb](https://github.com/juliangruber/memdb) for our database (keeping the metadata in memory rather than on the file system). In your `index.js` file, require the main modules and set them up:

```js
var memdb = require('memdb')
var Hyperdrive = require('hyperdrive')
var Swarm = require('hyperdrive-archive-swarm')

var link = process.argv[2] // user inputs the dat link

var db = memdb()
var drive = Hyperdrive(db)
var archive = drive.createArchive(link)
var swarm = Swarm(archive)
```

Notice, the user will input the link for the second argument The easiest way to get a file from a hyperdrive archive is to make a read stream. `archive.createFileReadStream` accepts the index number of filename for the first argument. To display the file, we can create a file stream and pipe it to `process.stdout`.

```js
var stream = archive.createFileReadStream(0) // get the first file
stream.pipe(process.stdout)
```

Now, you can run the module! To download the first file from our docs Dat, run:

```
node index.js 395e3467bb5b2fa083ee8a4a17a706c5574b740b5e1be6efd65754d4ab7328c2
```

You should see the first file in our docs repo.

#### Module #1 Bonus: Display any file in the Dat

With a few more lines of code, the user can enter a file to display from the Dat link.

Challenge: create a module that will allow the user to input a Dat link and a filename: `node bonus.js <dat-link> <filename>`. The module will print out that file from the link, as we did above. To get a specific file you can change the file stream to use the filename instead of the index number:

```js
var stream = archive.createFileReadStream(fileName)
```

Once you are finished, see if you can view this file by running:

```bash
node bonus.js 395e3467bb5b2fa083ee8a4a17a706c5574b740b5e1be6efd65754d4ab7328c2 cookbook/diy-dat.md
```

[See how we coded it](https://github.com/joehand/diy-dat-examples/blob/master/module-1/bonus.js). 

## Module #2: Download all files to computer

This module will build on the last module. Instead of displaying a single file, we will download all of the files from a Dat into a local directory. View the code for this module on [Github](https://github.com/joehand/diy-dat-examples/tree/master/module-2).

To download the files to the file system, instead of to a database, we will use the `file` option in `hyperdrive` and the [random-access-file](http://npmjs.org/random-access-file) module. We will also learn two new archive functions that make handling all the files a bit easier than the file stream in module #1. 

Setup will be the same as before (make sure you install random-access-file and stream-each this time): 

```bash
mkdir module-2 && cd module-2
npm init
npm install --save hyperdrive memdb hyperdrive-archive-swarm random-access-file stream-each
touch index.js
```

The first part of the module will look the same. We will add random-access-file (and [stream-each](http://npmjs.org/stream-each) to make things easier). The only difference is that we have to specify the `file` option when creating our archive:

```js
var memdb = require('memdb')
var Hyperdrive = require('hyperdrive')
var Swarm = require('hyperdrive-archive-swarm')
var raf = require('random-access-file') // this is new!
var each = require('stream-each')

var link = process.argv[2]

var db = memdb()
var drive = Hyperdrive(db)
var archive = drive.createArchive(link, {
  file: function (name) {
    return raf(path.join('download', name)) // download into a "download" dir
  }
})
var swarm = Swarm(archive)
```

Now that we are setup, we can work with the archive. The `archive.download` function downloads the file content (to wherever you specified in the file option). To download all the files, we will need a list of files and then we will call download on each of them. `archive.list` will give us the list of the files. We use the stream-each module to make it easy to iterate over each item in the archive, then exit when the stream is finished.

```js
var stream = archive.list({live: false}) // Use {live: false} for now to make the stream easier to handle.
each(stream, function (entry, next) {
  archive.download(entry, function (err) {
    if (err) return console.error(err)
    console.log('downloaded', entry.name)
    next()
  })
}, function () {
  process.exit(0)
})
```

You should be able to run the module and see all our docs files in the `download` folder:

```bash
node index.js 395e3467bb5b2fa083ee8a4a17a706c5574b740b5e1be6efd65754d4ab7328c2
```

## Module #3: Sharing a file

## Module #4: Sharing a directory of files
