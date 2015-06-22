# _ = require 'lodash'

module.exports = (Vue, options)->
    Vue.directive 'editable',
        twoWay: true
        bind: ->
            @el.setAttribute 'contenteditable', true
            @handler = (->
                @set @el.innerText
            ).bind this
            @el.addEventListener 'input', @handler
        update: (value)->
            if _.isString value
                @el.innerText = value
        unbind: ->
            @el.removeEventListener 'input', @handler
