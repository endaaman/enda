spaseo = require 'spaseo.js'
config = require '../config'

module.exports = (Vue)->
    if config.isLocal or spaseo.isOnPhantom
        return

    window.ga 'create', config.trackingCode, 'auto'

    Vue.router.on '$pageUpdated', (context, next, past, status)->
        window.ga 'send', 'pageview', context.path
        isFirstTime = false
