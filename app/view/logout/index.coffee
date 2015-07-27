Vue = require 'vue'

router = require '../../lib/router'
auth = require '../../lib/auth'
toast = require '../../lib/toast'

module.exports = Vue.extend
    template: '<h1>logout</h1>'
    attached: ->
        auth.logout()
        Vue.nextTick ->
            router.go '/', true
            toast 'ログアウトしたぜ'
