import path from 'path'
import ansi2html from 'ansi2html'
import express from 'express'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'

import u from './util'
import isomorphicConfig from '../webpack/isomorphic-tools'


const port = 8080
const webpackConfig = require('../webpack/config')
webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://localhost:8080`)

const compiler = webpack(webpackConfig)
const server = new webpackDevServer(compiler, webpackConfig.devServer)

const project_base_path = path.resolve(__dirname, '..')


global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
.development(true)
.server(project_base_path, ()=> {
  server.use(cookieParser())

  server.use('*', (req, res)=> {
    function onError(error) {
      var result = '' + error
      if (error.stack) {
        result = result + error.stack
      }
      console.error(result)
      res.status(500).send(`
        <html>
        <pre>${ansi2html(result)}</pre>
        </html>
      `)
    }

    u.removeDependingModuleCaches(require.resolve('./handler'), (name)=> {
      if (/\/node_modules\//.test(name)) {
        return false
      }
      return true
    })
    webpackIsomorphicTools.refresh()
    try {
      var handler = require('./handler').default
      console.info('LOADED HANDLER')
      handler(req, res, onError)
    } catch(error) {
      onError(error)
    }
  })

  server.listen(port, ()=> {
    console.info(`STARTED(port:${port}, mode: development)`)
  })
})
