var fs = require('fs')
var ndjson = require('ndjson')

fs.mkdirSync('docs/modules')
process.stdin.pipe(ndjson.parse()).on('data', function (obj) {
  fs.writeFileSync('docs/modules/' + obj.name + '.md', obj.readme)
})
