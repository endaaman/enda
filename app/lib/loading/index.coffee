module.exports = (Vue, options)->
    active = false
    loading = new Vue
        el: '#loading'
        replace: true
        template: do require './index.jade'
        computed:
            active:
                set: (a)->
                    active = a
                    if active
                        @$$.loader.classList.add 'loading-active'
                    else
                        @$$.loader.classList.remove 'loading-active'
                get: ->
                    active

    Vue.loading = loading
