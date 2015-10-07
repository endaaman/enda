Vue = require 'vue'
spaseo = require 'spaseo.js'

Memo = require '../../resource/memo'

module.exports = Vue.extend
    template: do require './list.jade'
    data: ->
        active: @$auth.active()
    created: ->
        @$resolve
            memos: Memo.get().then (res)->
                res.data
