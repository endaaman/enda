isLocal = /local/.test location.host

module.exports =
    siteName: 'えんだーまんの家'
    defaultImage: require './assets/endaaman.png'
    baseUrl: location.protocol + '//' + location.host
    api: '/api'
    tokenKey: 'token'
    trackingCode: 'UA-64476534-1'
    isLocal: isLocal
    isRemote: not isLocal
