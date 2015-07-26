config = require '../config'

module.exports =
    set: (t)->
        localStorage.setItem 'token', t
    get: ->
        localStorage.getItem 'token'
    clear: ->
        localStorage.removeItem 'token'
    header: ->
        'Authorization': "Bearer #{@get()}"
