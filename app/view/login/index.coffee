Vue = require 'vue'
request = require 'superagent'
page = require 'page'

config = require '../../config'
token = require '../../lib/token'

module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        credentials:
            username: ''
            password: ''

    methods:
        performLogin: (e)->
            e.preventDefault()
            request
            .post "#{config.api}/session"
            .send @credentials
            .end (err, res)=>
                if err
                    Vue.toast 'ハゲ'
                    return

                token.set res.body.token
                page '/'
                Vue.toast 'いいぞ〜〜'
