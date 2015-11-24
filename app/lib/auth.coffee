config = require '../config'
u = require '../util'

user = null

setUser = (u)->
    user = u

module.exports = (Vue)->
    auth =
        active: -> user?
        user: (copy)->
            if copy? and copy
                u.extend {}, user,  true
            else
                user

        check: ->
            Vue.http
            .get "#{config.api}/session", (data)->
                setUser data.user
            .error (err)=>
                @silentLogout()
                throw err

        login: (credentials)->
            Vue.http
            .post "#{config.api}/session", credentials, (data)->
                Vue.token.set data.token
                setUser data.user
            .error (err)=>
                @silentLogout()
                throw err

        logout: ->
            user = null
            Vue.token.clear()


    Vue.auth = Vue.prototype.$auth = auth
