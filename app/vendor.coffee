require 'font-awesome/css/font-awesome.css'

if /localhost/.test location.host
    require 'webpack-dev-server/client?http://localhost:8080'

require('es6-promise').polyfill()
require 'page'
require 'lodash'
require 'moment'
require 'superagent'
require 'eventemitter2'

require 'vue'
require 'marked'
require 'spaseo.js'
require 'highlight.js'
