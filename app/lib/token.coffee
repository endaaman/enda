http = (require 'vue').http
config = require '../config'

token =
    set: (token)->
        localStorage.setItem config.tokenKey, token
        http.headers.common['Authorization'] = 'Bearer '+ token
    get: ->
        (localStorage.getItem config.tokenKey) or ''
    exists: ->
        !!@get()
    clear: ->
        localStorage.removeItem config.tokenKey
        delete http.headers.common['Authorization']
    header: ->
        token = @get()
        if token
            "#{config.authHeaderName}": token
        else
            {}

if token.exists()
    token.set token.get()

module.exports = token
