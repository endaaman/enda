Vue = require 'vue'

module.exports = Vue.extend
    replace: true
    template: do require './index.jade'
    data: ->
        open: false
        active: @$auth.active()
    methods:
        sidebarToggle: ->
            @open = not @open

        sidebarOpen: ->
            @open = true

        sidebarClose: ->
            @open = false

    attached: ->
        @$router.on '$pageUpdated', @sidebarClose
        window.addEventListener 'resize', @sidebarClose
    destroyed: ->
        window.removeEventListener 'resize', @sidebarClose
