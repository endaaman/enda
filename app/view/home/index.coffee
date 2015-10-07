Vue = require 'vue'


module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        active: @$auth.active()
