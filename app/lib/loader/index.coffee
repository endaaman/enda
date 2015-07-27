Vue = require 'vue'

loader = new Vue
    replace: true
    template: do require './index.jade'
    methods:
        show: ->
            @$$.loader.classList.add 'loader-active'
        hide: ->
            @$$.loader.classList.remove 'loader-active'

loader.$mount().$appendTo document.body

module.exports =
    show: ->
        loader.show()
    hide: ->
        loader.hide()
