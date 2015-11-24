EventEmitter2 = (require 'eventemitter2')
spaseo = require 'spaseo.js'

u = require './util'

ee = new EventEmitter2()
pendings = []
vms = []

baseResolver =
    append: (promise)->
        pendings.push promise

resolver = u.extend ee, baseResolver


module.exports = (Vue, options)->

    Vue.router.on '$pageUpdated', ->
        if pendings.length is 0
            return

        cb = spaseo()

        resolver.emit '$resolving'

        Promise.all pendings
        .then ->
            resolver.emit '$resolved'
            for vm in vms
                vm.$emit '$resolved'
            vms = []
            pendings = []
            cb()
        , ->
            resolver.emit '$rejected'
            for vm in vms
                vm.$emit '$rejected'
            vms = []
            pendings = []
            cb 404

    Vue.resolver = resolver

    Vue.prototype.$resolve = (dictPromises)->
        vm = this
        vm.$set 'resolved', false
        vm.$set 'rejected', false
        vms.push vm

        opt = vm.$options

        keyMap = []
        promises = []
        for k, v of dictPromises
            vm.$set k, null
            keyMap.push k
            promises.push v

        pending = Promise.all promises
        .then (results)->
            for i, result of results
                if typeof result is 'undefined'
                    e = new Error "You resolve undefined by `#{keyMap[i]}`"
                    console.warn e.stack
                vm[keyMap[i]] = result
            vm.$set 'resolved', true
            if typeof opt.resolved is 'function'
                opt.resolved.call vm
        , (err)->
            vm.$set 'rejected', true
            if typeof opt.rejected is 'function'
                opt.rejected.call vm, err
            throw err

        pendings.push pending
