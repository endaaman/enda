Vue = require 'vue'


Vue.directive 'keywords', (value)->
    console.log value
    @el.setAttribute 'keywords', 'うんち,うんこ'


module.exports = Vue.extend
    template: do require './index.jade'
    data: ->
        messageList: [
            'ふとんがふっとんだ'
            '😁😁😁😁'
            '以上'
            '以上'
            '以上'
            '以上'
            '以上'
            '以上'
            '以上'
            '本当に以上だ😂😂😂😂'
        ]
        index: 0
    methods:
        toast: ->
            Vue.toast @messageList[if @index < @messageList.length then @index else @messageList.length-1]
            @index = @index + 1
