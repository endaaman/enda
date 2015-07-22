module.exports = (Vue, options)->
    loaders = []
    Vue.component 'loader',
        replace: true
        template: do require './index.jade'
        methods:
            start: ->
                @$$.loader.classList.add 'loader-active'
            finish: ->
                @$$.loader.classList.remove 'loader-active'

        attached: ->
            loaders.push this
        destroyed: ->
            if (idx = loaders.indexOf this) > 0
                delete loaders[idx]

    Vue.startLoading = ->
        for loader in loaders
            loader.start()
    Vue.finishLoading = ->
        for loader in loaders
            loader.finish()
