import express from 'express'
import cookieParser from 'cookie-parser'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'

import isomorphicConfig from '../webpack/isomorphic-tools'

const port = parseInt(process.argv[2]) || 8080
const project_base_path = require('path').resolve(__dirname, '..')
const server = express()


global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
.server(project_base_path, ()=> {

  server.use(cookieParser())
  // This handled is called cuz nginx serves forward
  server.use(express.static('dist'))

  server.enable('trust proxy')

  server.use('*', (req, res)=> {
    function onError(error) {
      res.status(500).send('Something is wrong')
      console.error(error)
    }
    var handler = require('./handler').default

    try {
      handler(req, res, onError)
    } catch(error) {
      onError(error)
    }
  })

  server.listen(port, ()=> {
    console.info(`STARTED(port:${port}, mode: production)`)
  })
})
