Vue = require 'vue'

Memo = require '../../resource/memo'


module.exports = Vue.extend
    template: do require './edit.jade'
    data: ->
        memo: null
        editing: !!@$context.params.title
    methods:
        performUpdate: (e)->
            e.preventDefault()

            if @editing
                p = Memo.update id: @memo._id, @memo
            else
                p = Memo.save {}, @memo

             p.then (res)=>
                @modified = false
                @$router.go "/memo/#{@memo.title}", true
                @$toast 'いいぞ〜〜'
            , (err)=>
                @$toast 'はげ'
                console.warn err

        performDelete: ->
            if not @editing
                return

            Memo.delete id: @memo._id
            .then (res)=>
                @$router.go '/memo'
                @$toast '削除しました'
            , =>
                @$toast 'エラーが発生しました'
    events:
        memoResolved: ->
            @memo = @$parent.memo

    created: ->
        if not @editing
            @memo =
                title: ''
                digest: ''
                draft: false
                content: ''
                created_at: null
                updated_at: null
