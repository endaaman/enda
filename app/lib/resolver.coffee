EventEmitter2 = (require 'eventemitter2')


u = require '../util'

ee = new EventEmitter2()
pendings = []
vms = []

baseResolver =
    append: (promise)->
        pendings.push promise

resolver = u.extend ee, baseResolver

st = (cb)->
    setTimeout cb, 0

module.exports = (Vue, options)->

    Vue.router.on '$pageUpdated', ->
        if pendings.length is 0
            return

        resolver.emit '$resolving'

        Promise.all pendings
        .then ->
            st ->
                resolver.emit '$resolved'
                for vm in vms
                    vm.$emit '$resolved'
                vms = []
                pendings = []
        , ->
            st ->
                resolver.emit '$rejected'
                for vm in vms
                    vm.$emit '$rejected'
                vms = []
                pendings = []

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
        .catch (e)->
            console.log e
            throw e
        .then (results)->
            st ->
                for i, result of results
                    if typeof result is 'undefined'
                        e = new Error "You resolve undefined by `#{keyMap[i]}`"
                        console.warn e.stack
                    vm[keyMap[i]] = result
                vm.$set 'resolved', true
                if typeof opt.resolved is 'function'
                    opt.resolved.call vm
            , 0
        , (e)->
            st ->
                vm.$set 'rejected', true
                if typeof opt.rejected is 'function'
                    opt.rejected.call vm, e
                console.warn e.stack

        pendings.push pending
