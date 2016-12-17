var fs = require('fs')
var mkdirp = require('mkdirp')
var ndjson = require('ndjson')

mkdirp.sync('docs/modules')
process.stdin.pipe(ndjson.parse()).on('data', function (obj) {
  fs.writeFileSync('docs/modules/' + obj.name + '.md', obj.readme)
})
