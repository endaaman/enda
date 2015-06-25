if /localhost/.test location.host
    require 'webpack-dev-server/client?http://localhost:8080'

require('es6-promise').polyfill()
require 'vue'
require 'page'
require 'lodash'
require 'moment'
require 'marked'
require 'spaseo.js'
require 'highlight.js'
require 'superagent'

require 'font-awesome/css/font-awesome.css'
