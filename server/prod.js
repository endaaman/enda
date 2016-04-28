var express = require('express')
var cookieParser = require('cookie-parser')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')

var port = parseInt(process.argv[2]) || 8080
var project_base_path = require('path').resolve(__dirname, '..')
var server = express()

global.API_BASE = (()=> {
  const hostname = process.env.VIRTUAL_HOST
  if (hostname) {
    if (/enda\.local/.test(hostname)) {
      return 'http://api.enda.local'
    } else {
      return 'http://api.endaaman.me'
    }
  } else {
    return 'http://localhost:3000'
  }
})()

console.log(`Set ${global.API_BASE} to API_BASE`)

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic-tools'))
.server(project_base_path, function(){

  server.use(cookieParser())
  // This handled is called cuz nginx serves forward
  server.use(express.static('build'))

  var handler = require('./handler').default
  server.use('*', function(req, res) {
    function onError(error) {
      res.status(500).send('Something is wrong')
    }

    try {
      handler(req, res, onError)
    } catch(error) {
      onError(error)
    }
  })

  server.listen(port, function() {
    console.log(`STARTED(port:${port}, mode: production)`)
  })
})
