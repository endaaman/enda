config = require '../config'

module.exports = (Vue)->
    token =
        set: (token)->
            localStorage.setItem config.tokenKey, token
            Vue.http.headers.common['Authorization'] = 'Bearer '+ token
        get: ->
            (localStorage.getItem config.tokenKey) or ''
        exists: ->
            !!@get()
        clear: ->
            localStorage.removeItem config.tokenKey
            delete Vue.http.headers.common['Authorization']
        header: ->
            token = @get()
            if token
                "#{config.authHeaderName}": token
            else
                {}

    if token.exists()
        token.set token.get()

    Vue.token = Vue.prototype.$token = token
