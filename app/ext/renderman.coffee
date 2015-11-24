isOnPhantom = typeof window.callPhantom is 'function'

innerWrapper = (cb)->
    setTimeout cb, 0

originalCallback = (status)->
    if isOnPhantom
        opt =
            command: 'FINISH'
        if status
            opt.status = status

        window.callPhantom opt

renderman = ->
    if isOnPhantom
        window.callPhantom
            command: 'START'

    (status)->
        innerWrapper ->
            originalCallback status

renderman.isOnPhantom = isOnPhantom

renderman.wrap = (wrapper)->
    innerWrapper = wrapper


module.exports = renderman
