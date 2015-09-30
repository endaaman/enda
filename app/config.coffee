isLocal = /local/.test location.host

getApiHost = ->
    if isLocal
        '//localhost:3000'
    else
        if /endaaman.me/.test location.host
            '//api.endaaman.me'
        else
            '//api.enda.local'


module.exports =
    siteName: 'えんだーまんの家'
    defaultImage: require './assets/endaaman.png'
    baseUrl: location.protocol + '//' + location.host
    api: getApiHost()
    tokenKey: 'token'
    trackingCode: 'UA-64476534-1'
    isLocal: isLocal
    isRemote: not isLocal
