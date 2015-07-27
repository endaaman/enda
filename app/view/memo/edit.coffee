Vue = require 'vue'
request = require 'superagent'

config = require '../../config'
token = require '../../lib/token'
router = require '../../lib/router'
toast = require '../../lib/toast'


module.exports = Vue.extend
    template: do require './edit.jade'
    data: ->
        memo:
            'title': ''
            'digest': ''
            'draft': false
            'content': ''
            'created_at': null
            'updated_at': null
        edit: false
    methods:
        jump: ->
            page '/memo'

        performUpdate: (e)->
            e.preventDefault()

            if not @memo.title
                Vue.toast 'タイトルがないぞハゲ'
                return

            if @edit
                req = request.put "#{config.api}/memos/#{@memo._id}"
            else
                req = request.post "#{config.api}/memos"
            req
            .set token.header()
            .send @memo
            .end (err, res)=>
                if err
                    toast 'ハゲ'
                    return
                router.go "/memo/#{res.body.title}"
                toast 'いいぞ〜〜'

        performDelete: ()->
            request
            .del "#{config.api}/memos/#{@memo._id}"
            .set token.header()
            .end (err, res)=>
                if err
                    Vue.toast 'ハゲ'
                    return
                router.go '/memo'
                toast 'いいぞ〜〜'

    attached: ->
        @edit = !!@$context.params.title

        if @edit
            request.get "#{config.api}/memos/#{@$context.params.title}"
            .end (err, res)=>
                if err
                    router.go '/memo'
                    return
                @$set 'memo', res.body
