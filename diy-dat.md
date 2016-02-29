# DIY Dat

This document shows how to write your own compatible `dat` client using node modules.

The three essential node modules are called [hyperdrive](https://npmjs.org/hyperdrive), [discovery-swarm](https://npmjs.org/discovery-swarm) and [level](https://npmjs.org/level). Hyperdrive does file synchronization and versioning, discovery-swarm does peer discovery over local networks and the Internet, and level provides a local LevelDB for storing metadata. More details are available in [How Dat Works](how-dat-works.md). The [dat](https://npmjs.org/dat) module itself is just some code that combines these two modules and wraps them in a command-line API.

Here's the minimal code needed to download data from a dat:

```js
var Swarm = require('discovery-swarm')
var Hyperdrive = require('hyperdrive')
var Level = require('level')

// run this like: node thisfile.js 4c325f7874b4070blahblahetc
// the dat link someone sent us, we want to download the data from it
var link = new Buffer(process.argv[2], 'hex')

// here are the default config dat uses:
// used for MDNS and also as the dns 'app name', you prob shouldnt change this
var DAT_DOMAIN = 'dat.local'
// dat will try this first and pick the first open port if its taken
var DEFAULT_LOCAL_PORT = 3282 
// we run the servers below you can use if you want or run your own
var DEFAULT_DISCOVERY = [
  'discovery1.publicbits.org',
  'discovery2.publicbits.org'
]
var DEFAULT_BOOTSTRAP = [
  'bootstrap1.publicbits.org:6881',
  'bootstrap2.publicbits.org:6881',
  'bootstrap3.publicbits.org:6881',
  'bootstrap4.publicbits.org:6881'
]

var db = Level('./dat.db')
var drive = Hyperdrive(db)
var swarm = Swarm({
  id: drive.core.id,
  dns: {server: DEFAULT_DISCOVERY, domain: DAT_DOMAIN},
  dht: {bootstrap: DEFAULT_BOOTSTRAP},
  stream: function () {
    // this is how the swarm and hyperdrive interface
    console.log('new peer stream')
    return drive.createPeerStream()
  }
})

swarm.once('listening', function () {
  console.log('joining', link)
  // join the swarm
  swarm.join(link)
  // tell hyperdrive to start downloading/uploading in ./data
  var archive = drive.get(link, process.cwd() + '/data')
  archive.ready(function (err) {
    console.log('archive ready')
    // a stream of all metadata. after retrieving each entry metadata will be cached locally
    // but the first time it has to fetch it from the swarm
    var metadata = archive.createEntryStream()
    // start downloading all entries, or choose your own filter logic to download specific entries
    // entries will be either files or directories
    metadata.on('data', function (entry) {
      var dl = archive.download(entry)
      console.log('downloading', entry.name, dl)
      
      dl.on('ready', function () {
        console.log('download started', entry.name, dl)
      })
    })
  })
})

swarm.listen(DEFAULT_LOCAL_PORT)
```