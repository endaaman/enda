Vue = require 'vue'

request = require 'superagent'
spaseo = require 'spaseo.js'

config = require '../../config'
auth = require '../../lib/auth'

module.exports = Vue.extend
    template: do require './list.jade'
    data: ->
        memos: []
        active: auth.active()
    attached: ->
        # @$startLoading()
        cb = spaseo()
        request.get "#{config.api}/memos"
        .end (err, res)=>
            # @$finishLoading()
            cb()
            if err
                return
            @memos = res.body
