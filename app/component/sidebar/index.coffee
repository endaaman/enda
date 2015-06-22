Vue = require 'vue'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        open: false
    methods:
        sidebarToggle: ->
            if @open
                @sidebarClose()
            else
                @sidebarOpen()

        sidebarOpen: ->
            @$el.classList.add 'sidebar-open'
            @$$.togglerIcon.classList.add 'fa-times'
            @$$.togglerIcon.classList.remove 'fa-bars'
            @open = true

        sidebarClose: ->
            @$el.classList.remove 'sidebar-open'
            @$$.togglerIcon.classList.remove 'fa-times'
            @$$.togglerIcon.classList.add 'fa-bars'
            @open = false


    attached: ->
        @$on '$pageUpdated', ->
            @sidebarClose()

    created: ->
        window.addEventListener 'resize', =>
            @sidebarClose()
