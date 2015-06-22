Vue = require 'vue'
request = require 'superagent'
page = require 'page'

config = require '../../config'
token = require '../../lib/token'



module.exports = ->
    request
    .get "#{config.api}/session"
    .send @credentials
    .end (err, res)->
        active = !err
