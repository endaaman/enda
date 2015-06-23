Vue = require 'vue'
page = require 'page'
request = require 'superagent'
marked = require 'marked'
spaseo = require 'spaseo.js'

config = require '../../config'


module.exports = Vue.extend
    template: do require './show.jade'
    data: ->
        memo: {}
        compiledContent: ''
    attached: ->
        cb = spaseo()
        request.get "#{config.api}/memos/#{@$context.params.title}"
        .end (err, res)=>
            if err
                page '/memo'
                return
            @memo = res.body
            @compiledContent = marked @memo.content
            cb()
