Vue = require 'vue'
spaseo = require 'spaseo.js'

module.exports = Vue.extend
    template: do require './index.jade'
    created: ->
        spaseo() 404
