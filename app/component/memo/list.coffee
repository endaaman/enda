Vue = require 'vue'
request = require 'superagent'

config = require '../../config'


module.exports = Vue.extend
    template: do require './list.jade'
    data: ->
        memos: []
    attached: ->
        request.get "#{config.api}/memos"
        .end (err, res)=>
            @memos = res.body
