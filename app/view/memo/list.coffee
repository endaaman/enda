request = require 'superagent'
spaseo = require 'spaseo.js'

config = require '../../config'


module.exports = (Vue, options)->
    Vue.component 'memo-list',
        replace: true
        template: do require './list.jade'
        data: ->
            memos: []
        attached: ->
            @$startLoading()
            cb = spaseo()
            request.get "#{config.api}/memos"
            .end (err, res)=>
                @$finishLoading()
                cb()
                if err
                    return
                @memos = res.body
