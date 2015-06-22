Vue = require 'vue'
page = require 'page'
request = require 'superagent'
marked = require 'marked'

config = require '../../config'


module.exports = Vue.extend
    template: do require './show.jade'
    data: ->
        memo: {}
        compiledContent: ''
    attached: ->
        request.get "#{config.api}/memos/#{@$context.params.id}"
        .end (err, res)=>
            if err
                page '/memo'
                return
            @memo = res.body
            @compiledContent = marked @memo.content
