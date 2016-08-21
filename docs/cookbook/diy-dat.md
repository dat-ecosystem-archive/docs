# DIY Dat

This document shows how to write your own compatible `dat` client using node modules.

The three essential node modules are called [hyperdrive](https://npmjs.org/hyperdrive), [hyperdrive-archive-swarm](https://npmjs.org/hyperdrive-archive-swarm) and [level](https://npmjs.org/level). Hyperdrive does file synchronization and versioning, hyperdrive-archive-swarm does peer discovery over local networks and the Internet, and level provides a local LevelDB for storing metadata. More details are available in [How Dat Works](how-dat-works.md). The [dat](https://npmjs.org/dat) module itself is just some code that combines these modules and wraps them in a command-line API.

Here's the minimal code needed to download data from a dat:

```js
// run this like: node thisfile.js 4c325f7874b4070blahblahetc
// the dat link someone sent us, we want to download the data from it
var link = new Buffer(process.argv[2], 'hex')

var Hyperdrive = require('hyperdrive')
var Swarm = require('hyperdrive-archive-swarm')
var level = require('level')
var raf = require('random-access-file')
var each = require('stream-each')

var db = level('./dat.db')
var drive = Hyperdrive(db)
var archive = drive.createArchive(link, {
  file: function (name) {
    return raf(path.join(self.dir, name))
  }
})
var swarm = Swarm(archive)

archive.open(function (err) {
  if (err) return console.error(err)
  each(archive.list({live: archive.live}), function (data, next) {
    var startBytes = self.stats.bytesDown
    archive.download(data, function (err) {
      if (err) return console.error(err)
      console.log('file downloaded', data.relname)
      next()
    })
  }, done)
})

```
