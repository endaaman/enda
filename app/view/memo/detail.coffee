Vue = require 'vue'
marked = require 'marked'
spaseo = require 'spaseo.js'

Memo = require '../../resource/memo'

module.exports = Vue.extend
    template: do require './detail.jade'
    data: ->
        notFound: false
    updated: ->
        @$resolve
            memo: Memo.get(id: @$context.params.title).then (res)->
                res.data
    resolved: ->
        @$broadcast 'memoResolved'

    rejected: ->
        @notFound = true
