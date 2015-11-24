isOnPhantom = typeof window.callPhantom is 'function'

innerWrapper = (cb)->
    setTimeout cb, 0

$log = (text)->
    if isOnPhantom
        window.callPhantom
            command: 'LOG'
            text: text

originalCallback = (status)->
    if isOnPhantom
        if not status
            status = 200

        window.callPhantom
            command: 'FINISH'
            status: status

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

renderman.log = (text)->
    $log text


module.exports = renderman
