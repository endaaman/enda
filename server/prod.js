require('babel-polyfill')
require('babel-register')


var express = require('express')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')

var port = parseInt(process.argv[2]) || 8080
var project_base_path = require('path').resolve(__dirname, '..')
var handler = require('./handler').default

var server = express()
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
.server(project_base_path, function(){
  server.use('*', function(req, res) {
    handler(req, res, ()=> {
      res.status(500).send('Something is wrong')
    })
  })

  server.listen(port, function() {
    console.log(`STARTED(port:${port}, mode: production)`)
  })
})
