# Using the Hyperdrive FS

[Hyperdrive](https://github.com/mafintosh/hyperdrive), the core file system module in dat, exposes an API that mimics the Node fs API. This allows you to create modules that act on hyperdrive or a regular fs with the same API. We have several modules that we make use of this custom fs, such as [mirror-folder](https://github.com/mafintosh/mirror-folder). 

Mirror folder can copy a regular directory to another regular directory:

```js
var mirror = require('mirror-folder')

mirror('/source', '/dest', function (err) {
  console.log('mirror complete')
})
```

You can also copy a folder to an archive (this is how we do importing in Dat):

```js
var archive = hyperdrive('/dir')
mirror('/source', {name: '/', fs: archive}, function (err) {
  console.log('mirror complete')
})
```

### Creating Custom FS Modules

To create a module that uses a custom fs, you can default to the regular `fs` but also accept `fs` as an argument. For example, to print a file you could write this function:

```js
function printFile(file, fs) {
  if (!fs) fs = require('fs')

  fs.readFile(file, 'utf-8', function (err, data) {
    console.log(data)
  }) 
}
```

Then you could use this to print a file from a regular fs:

```js
printFile('/data/hello-world.txt')
```

Or from a hyperdrive archive:

```js
var archive = hyperdrive('/data')
printFile('/hello-world.txt', archive) // pass archive as the fs!
```

## Modules!

See more examples of custom-fs modules:

* [mirror-folder](https://github.com/mafintosh/mirror-folder) - copy files from one fs to another fs (regular or custom)
* [count-files](https://github.com/joehand/count-files) - count files in regular or custom fs.
* [ftpfs](https://github.com/maxogden/ftpfs) - custom fs for FTPs
* [bagit-fs](https://github.com/joehand/bagit-fs) - custom fs module for the BagIt spec.
