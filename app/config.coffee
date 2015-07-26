getApiHost = ->
    if /localhost/.test location.host
        'http://localhost:3000'
    else
        if /endaaman.me/.test location.host
            'http://api.endaaman.me'
        else
            'http://api.enda.local'

module.exports =
    siteName: 'えんだーまんの家'
    defaultImage: require './assets/endaaman.png'
    api: getApiHost()
    baseUrl: location.protocol + '//' + location.host
    tokenKey: 'token'
