---
id: dat-sdk
title: Using the Dat SDK
---

## What is it

The Dat Software Development Kit is a JavaScript library which makes it easy to build applications with Dat for Node.js and web browsers. It puts together the modules used by Dat and provides an [easy API](https://github.com/datproject/sdk#api-promise) which handles various platform differences and networking/storage behind the scenes.

### Loading a Dat

Here's an example of how you can use the SDK to load a dat archive and download a file from it.

```js
const {DatArchive} = datSdk()

// Load the archive for the dat foundation website
const archive = DatArchive.load(`dat://dat.foundation`)

// Read a file and parse it as JSON
const datJSON = JSOn.parse(await archive.readFile('/dat.json'))

console.log(datJSON)
```

### Creating a Dat

```js
const {DatArchive} = datSdk()

const archive = await DatArchive.create({
  title: 'Example'
})

await archive.writeFile('/index.html', '<h1>Hello World!</h1>')

// Open this in Beaker
console.log(archive.url)
```

## Running in Node.js

Install the SDK

```shell
npm install --save dat-sdk
```

Require it in your script (`index.js`), and initialize it.

```js
const datSdk = require('dat-sdk/promise')

const {DatArchive, destroy} = datSdk()

DatArchive.create({
  title: 'Example',

  // This archive will disappear from storage after the process exists
  persist: false
}).then(async (archive) => {
  await archive.writeFile('/index.html', '<h1>Hello World!</h1>')

  console.log(`Open up ${archive.url} in Beaker or the CLI`)
})
```

Then you can run your example:

```shell
node index.js
```

## Running in Browser

### How it works

Dat is written in JavaScript, so naturally, it can work entirely in the browser!
The great part about this is that as more peers connect to each other in their client, the site assets will be shared between users rather hitting any server.

This approach is similar to that used in Feross' [Web Torrent](http://webtorrent.io).
The difference is that Dats can be rendered live and read dynamically, whereas BitTorrent links are static.
The original owner of a Dat can update the files in the directory and all peers will receive the updates automatically.

### Using browserify to build

You can use the same workflow as Node.js if you use [Browserify](http://browserify.org/) to bundle your code into one big file.

```
browserify index.js > bundle.js
```

You should add this file to your `.gitignore` file so it isn't committed to history.

Then you should set up your HTML page to link to the bundle.

```HTML
<title>Dat Example</title>
<script>
  console.log = (...args) => document.body.innerText = args.join(' ')
</script>
<script src="bundle.js"></script>
```

From here you can

### Using script tags to load the SDK

Embed one of the following script tags on your page to load whatever flavor of the SDK that you prefer.

```html
<script src="https://bundle.run/dat-sdk@1"></script>
<script src="https://bundle.run/dat-sdk@1/promise.js"></script>
<script src="https://bundle.run/dat-sdk@1/auto.js"></script>
```

These will create a `datSdk` global which you can use in your code.

```html
<script>
  // If you used the default import
  const {Hyperdrive, destroy} = window.datSdk()

  // If you used the promise or `auto` version
  const {DatArchive} = window.datSdK()

  // Look at the examples from here
</script>
```

### Persisting Data

Storage in the SDK is handed by the [universal-dat-storage](https://github.com/RangerMauve/universal-dat-storage) module which adapts to different environments.

In Node.js, by default it stores data in your home directory using the [env-paths](https://github.com/sindresorhus/env-paths#pathsdata) module using `dat` as the application name.

In the web, we use [random-access-web](https://github.com/random-access-storage/random-access-web) which uses a combination of [random-access-idb](https://www.npmjs.com/package/random-access-idb), [random-access-chrome-file](https://www.npmjs.com/package/random-access-chrome-file), and [random-access-idb-mutable-file](https://www.npmjs.com/package/random-access-idb-mutable-file). The module will automatically choose the best implementation based on performance.

You can control whether an archive or feed should be persisted to storage based on the `persist` flag when you initialize it.

### Writing large files from the filesystem to the browser

File writes are limited to the available memory on the machine.
Files are buffered (read: copied) *into memory* while being written to the hyperdrive instance.
This isn't ideal, but works as long as file sizes stay below system RAM limits.

To fix this problem, you can use [random-access-file-reader](https://github.com/mafintosh/random-access-file-reader) to read the files directly from the filesystem instead of buffering them into memory.

## Learning more

Check out the [examples](https://github.com/datproject/sdk#apiexamples-callbacks) in the Github repository for the SDK, and feel free to [open an issue](https://github.com/datproject/sdk/issues/new) if you need help or have questions.

### Get in touch!

Come over to our community channels and ask a question.
It's probably a good one and we should cover it in the documentation.
Thanks for trying it out, and PRs always welcome!

[![#dat IRC channel on freenode](https://img.shields.io/badge/irc%20channel-%23dat%20on%20freenode-blue.svg)](http://webchat.freenode.net/?channels=dat)
[![datproject/discussions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/datproject/discussions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
