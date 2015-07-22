Vue = require 'vue'

events = (require '../../lib/router').events
auth = require '../../lib/auth'

module.exports = Vue.extend
    replace: true
    template: do require './index.jade'
    data: ->
        open: false
        active: auth.active()
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
        events.on '$pageUpdated', @sidebarClose
        window.addEventListener 'resize', @sidebarClose
    destroyed: ->
        events.off '$pageUpdated', @sidebarClose
        window.removeEventListener 'resize', @sidebarClose
