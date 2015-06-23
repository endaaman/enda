Vue = require 'vue'
request = require 'superagent'
spaseo = require 'spaseo.js'

config = require '../../config'


module.exports = Vue.extend
    template: do require './list.jade'
    data: ->
        memos: []
    attached: ->
        cb = spaseo()
        request.get "#{config.api}/memos"
        .end (err, res)=>
            @memos = res.body
            cb()
