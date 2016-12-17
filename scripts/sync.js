var path = require('path')
var ghAuth = require('ghauth')
var ecosystem = require('ecosystem-docs')
var split = require('split2')

var modules = []

process.stdin.pipe(split()).on('data', function (data) {
  modules.push(data)
}).on('end', function () {
  syncModules(modules, function () {
    process.exit(0)
  })
})

function syncModules (modules, cb) {
  console.log('syncing', modules)
  if (process.env.GH_TOKEN) return sync(process.env.GH_TOKEN)

  ghAuth({
    configName: 'ecosystem-docs',
    userAgent: 'ecosystem-docs',
    scopes: ['user']
  }, (err, auth) => {
    if (err) return cb(err)
    sync(auth.token)
  })

  function sync (token) {
    ecosystem.sync(modules, {
      data: path.join(__dirname, '..', '.data'),
      token: token
    }, cb)
  }
}