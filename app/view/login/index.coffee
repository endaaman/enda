Vue = require 'vue'

router = require '../../lib/router'
auth = require '../../lib/auth'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        credentials:
            username: ''
            password: ''

    methods:
        performLogin: (e)->
            e.preventDefault()

            auth.login @credentials
            .then ->
                router.go '/', true
                Vue.toast 'いいぞ〜〜'
            , ->
                Vue.toast 'ハゲ'
