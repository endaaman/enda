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
        cb 404
        do reset
