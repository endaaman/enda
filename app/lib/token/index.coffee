config = require '../../config'

module.exports =
    set: (t)->
        localStorage.setItem 'token', t
    get: ->
        localStorage.getItem 'token'
    header: ->
        'Authorization': "Bearer #{@get()}"
