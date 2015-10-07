Vue = require 'vue'
marked = require 'marked'
spaseo = require 'spaseo.js'

Memo = require '../../resource/memo'

module.exports = Vue.extend
    template: do require './show.jade'
    data: ->
        compiledContent: ''
        active: @$auth.active()
        memo: null

    events:
        memoResolved: ->
            @memo = @$parent.memo
            @compiledContent = marked @memo.content

            matchedImage = @memo.content.match /\!\[.*\]\((.*)\)/
            @$meta
                title: @memo.title
                image: if matchedImage and matchedImage[1] then matchedImage[1] else null
                description: @memo.digest
