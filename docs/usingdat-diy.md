---
id: diy-dat
title: Building with Dat
---

In this guide, we will show how to develop applications with the Dat ecosystem. The Dat ecosystem is very modular making it easy to develop custom applications using Dat.

Dat comes with a built in javascript API we use in Dat Desktop and dat command line. For custom applications, or more control, you can also use the core Dat modules separately.

Use Dat in your JS Application:

1. `require('dat')`: use the [high-level Dat JS API](https://github.com/datproject/dat-node).
2. Build your own!

This tutorial will cover the second option and get you familiar with the core Dat modules.

### The Dat Core Modules

This tutorial will follow the steps for sharing and downloading files using Dat. In practice, we implement these in [dat-node](https://github.com/datproject/dat-node), a high-level module for using Dat that provides easy access to the core Dat modules.

For any Dat application, there are two essential modules you will start with:

1. [hyperdrive](https://npmjs.org/hyperdrive) for file synchronization and versioning
2. [hyperdiscovery](https://npmjs.org/hyperdiscovery) helps discover and connect to peers over local networks and the internet

The [Dat CLI](https://npmjs.org/dat) module itself combines these modules and wraps them in a command-line API. We also use the [dat-storage](https://github.com/datproject/dat-storage) module to handle file and key storage. These modules can be swapped out for a similarly compatible module, such as switching storage for [random-access-memory](https://github.com/mafintosh/random-access-memory).

## Getting Started

You will need node and npm installed to build with Dat. [Read more](https://github.com/datproject/dat/blob/master/CONTRIBUTING.md#development-workflow) about our development work flow to learn how we manage our module dependencies during development.

## Download a File

Our first module will download files from a Dat read key entered by the user.

```bash
mkdir module-1 && cd module-1
npm init
npm install --save hyperdrive random-access-memory hyperdiscovery
touch index.js
```

For this example, we will use random-access-memory for our database (keeping the metadata in memory rather than on the file system). In your `index.js` file, require the main modules and set them up:

```js
var ram = require('random-access-memory')
var hyperdrive = require('hyperdrive')
var discovery = require('hyperdiscovery')

var readKey = process.argv[2] // user inputs the dat read key
var key =  readKey.replace('dat://', '') // extract the key

var archive = hyperdrive(ram, key)
archive.ready(function () {
  discovery(archive)
})
```

Notice, the user will input the read key for the second argument. The easiest way to get a file from a hyperdrive archive is to make a read stream. `archive.readFile` accepts the index number of filename for the first argument. To display the file, we can create a file stream and pipe it to `process.stdout`.

```js
// Make sure your archive has a dat.json file!
var stream = archive.readFile('dat.json', 'utf-8', function (err, data) {
  if (err) throw err
  console.log(data)
})
```

Now, you can run the module! To download the `dat.json` file from an archive:

```
node index.js dat://<readKey>
```

You should see the `dat.json` file.

#### Bonus: Display any file in the Dat

With a few more lines of code, the user can enter a file to display from the Dat.

Challenge: create a module that will allow the user to input a Dat read key and a filename: `node bonus.js <dat-readKey> <filename>`. The module will print out that file from the readKey, as we did above:

```js
var stream = archive.readFile(fileName)
```

Once you are finished, see if you can view this file by running:

```bash
node bonus.js 395e3467bb5b2fa083ee8a4a17a706c5574b740b5e1be6efd65754d4ab7328c2 readme.md
```

## Download all files to computer

This module will build on the last module. Instead of displaying a single file, we will download all of the files from a Dat into a local directory.

To download the files to the file system, we are going to use [mirror-folder](https://github.com/mafintosh/mirror-folder). [Read more](/using-fs) about how mirror-folder works with hyperdrive.

In practice, you should use [dat-storage](https://github.com/datproject/dat-storage) to do this as it'll be more efficient and keep the metadata on disk.

Setup will be the same as before (make sure you install `mirror-folder`). The first part of the module will look the same.

```js
var path = require('path')
var ram = require('random-access-memory')
var hyperdrive = require('hyperdrive')
var discovery = require('hyperdiscovery')
var mirror = require('mirror-folder')
var mkdirp = require('mkdirp')

var readKey = process.argv[2] // user inputs the dat readKey
var key = readKey.replace('dat://', '') // extract the key
var dir = path.join(process.cwd(), 'dat-download') // make a download folder
mkdirp.sync(dir)

var archive = hyperdrive(ram, key)
archive.ready(function () {
  discovery(archive)

  var progress = mirror({name: '/', fs: archive}, dir, function (err) {
    console.log('done downloading!')
  })
  progress.on('put', function (src) {
    console.log(src.name, 'downloaded')
  })
})
```

You should be able to run the module and see all our docs files in the `download` folder:

```bash
node index.js dat://<readKey>
```
