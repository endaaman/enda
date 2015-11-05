Vue = require 'vue'
marked = require 'marked'
spaseo = require 'spaseo.js'

Memo = require '../../resource/memo'

module.exports = Vue.extend
    template: do require './show.jade'
    data: ->
        active: @$auth.active()
        memo: null

    events:
        memoResolved: ->
            @memo = @$parent.memo
            compiledContent = marked @memo.content

            @$$.content.innerHTML = compiledContent
            elImage = document.querySelector '#memoContent img'
            @$meta
                title: @memo.title
                image: elImage.src or null
                description: @memo.digest
