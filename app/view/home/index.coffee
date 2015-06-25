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
            'なんかごめんな😂'
        ]
        index: 0
    methods:
        toast: ->
            Vue.toast @messageList[if @index < @messageList.length then @index else @messageList.length-1]
            @index = @index + 1
        loading: ->
            Vue.loading.active = true
            Vue.toast '7秒だけ回します。回るだけです。'
            setTimeout ->
                Vue.loading.active = false
            , 5000
