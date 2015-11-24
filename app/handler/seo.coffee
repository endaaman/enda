renderman = require '../ext/renderman'

module.exports = (Vue)->
    cb = null
    do reset = ->
        cb = (->)

    Vue.resolver.on '$resolving', ->
        cb = renderman()

    Vue.resolver.on '$resolved', ->
        do cb
        do reset

    Vue.resolver.on '$rejected', ->
        # tell Phantom if the page is 404
        cb 404
        do reset
