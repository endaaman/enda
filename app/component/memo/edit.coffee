Vue = require 'vue'
page = require 'page'
request = require 'superagent'

config = require '../../config'
token = require '../../lib/token'


module.exports = Vue.extend
    template: do require './edit.jade'
    data: ->
        memo:
            'title': ''
            'digest': ''
            'content': ''
            'created_at': null
            'updated_at': null
        edit: false
    methods:
        performUpdate: (e)->
            e.preventDefault()

            if @edit
                req = request.put "#{config.api}/memos/#{@memo._id}"
            else
                req = request.post "#{config.api}/memos"
            req
            .set token.header()
            .send @memo
            .end (err, res)=>
                if err
                    Vue.toast 'ハゲ'
                    return
                page "/memo/#{res.body.title}"
                Vue.toast 'いいぞ〜〜'

        performDelete: ()->
            request
            .del "#{config.api}/memos/#{@memo._id}"
            .set token.header()
            .end (err, res)->
                if err
                    Vue.toast 'ハゲ'
                    return
                page '/memo'
                Vue.toast 'いいぞ〜〜'

    attached: ->
        @edit = !!@$context.params.title

        if @edit
            request.get "#{config.api}/memos/#{@$context.params.title}"
            .end (err, res)=>
                if err
                    page '/memo'
                    return
                @memo = res.body
