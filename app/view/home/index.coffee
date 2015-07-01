module.exports = (Vue, options)->
    Vue.component 'home',
        replace: true
        template: do require './index.jade'
        methods:
            loading: ->
                # @$startLoading()
                # setTimeout =>
                #     @$finishLoading()
                # , 5000
                console.log 'cl'
                @$dispatch 'hoge', 'fuga'
        attched: ->
            @$on 'hoge', (v)->
                console.log '[home.hoge]: ' + v
