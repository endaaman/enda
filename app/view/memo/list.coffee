Vue = require 'vue'

request = require 'superagent'
spaseo = require 'spaseo.js'

config = require '../../config'
auth = require '../../lib/auth'
loader= require '../../lib/loader'
router = require '../../lib/router'

module.exports = Vue.extend
    template: do require './list.jade'
    data: ->
        memos: []
        active: auth.active()
    attached: ->
        loader.show()
        cb = spaseo()
        request.get "#{config.api}/memos"
        .end (err, res)=>
            loader.hide()
            cb()
            if err
                router.go '/'
                return
            @$set 'memos', res.body

    filters:
        Vue.filter 'date', (_date, format)->
            date = new Date _date
            y = date.getFullYear()
            m = date.getMonth()
            d = date.getDate()
            "#{y} #{m}/#{d}"
