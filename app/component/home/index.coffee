Vue = require 'vue'


Vue.directive 'keywords', (value)->
    console.log value
    @el.setAttribute 'keywords', 'うんち,うんこ'


module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        messageList: [
            '地球が爆発した'
            'おまえはしぬ'
            '😁😁😁😁'
            '以上だ'
            '以上だ'
            '以上だ'
            'もういいだろ？'
            '以上だ'
            '以上だ'
            '以上だ'
            '以上だ'
            '本当に以上だ'
        ]
        index: 0
    methods:
        toast: ->
            Vue.toast @messageList[if @index < @messageList.length then @index else @messageList.length-1]
            @index = @index + 1
