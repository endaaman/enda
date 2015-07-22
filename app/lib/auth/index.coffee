config = require '../../config'
token = require '../token'
request = require 'superagent'

active = false

module.exports =
    active: -> active
    check: ->
        new Promise (resolve, reject)->
            request
            .get "#{config.api}/session"
            .set token.header()
            .end (err, res)->
                active = !err
                if err
                    reject err
                else
                    resolve res

    login: (credentials)->
        new Promise (resolve, reject)->
            request
            .post "#{config.api}/session"
            .send credentials
            .end (err, res)->
                token.set res.body.token
                active = !err
                if err
                    reject err
                else
                    resolve res

    logout: ->
        active = false
        token.clear()
