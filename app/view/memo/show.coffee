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
        Vue.loading.active = true
        cb = spaseo()
        request.get "#{config.api}/memos/#{@$context.params.title}"
        .end (err, res)=>
            Vue.loading.active = false
            if err
                page '/memo'
                return
            @memo = res.body
            @compiledContent = marked @memo.content
            cb()
