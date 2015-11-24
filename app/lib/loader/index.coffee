
module.exports = (Vue)->
    vm = new Vue
        template: do require './index.jade'
        methods:
            show: ->
                @$els.loader.classList.add 'loader-active'
                @$els.overlay.classList.add 'overlay-active'
            hide: ->
                @$els.loader.classList.remove 'loader-active'
                @$els.overlay.classList.remove 'overlay-active'

    loader = (v)->
        if v? and not v
            vm.hide()
        else
            vm.show()

    vm.$mount().$appendTo document.body

    Vue.loader = Vue.prototype.$loader = loader
