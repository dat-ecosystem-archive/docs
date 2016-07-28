var fs = require('fs')
var ndjson = require('ndjson')

process.stdin.pipe(ndjson.parse()).on('data', function (obj) {
  fs.writeFileSync('docs/' + obj.name + '.md', obj.readme)
})