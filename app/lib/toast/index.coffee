module.exports = (Vue, options)->
    toast = null
    Vue.component 'toast',
        replace: true
        template: do require './index.jade'
        data: ->
            message: ''
            timeoutId: null
        methods:
            cancelClosing: ->
                if @timeoutId
                    clearTimeout @timeoutId
                    @timeoutId = null

            open: (message, period)->
                @$el.classList.add 'toast-open'
                @message = message

                i_period = parseInt period

                # auto close: not provided or set positive
                i_period = i_period or 4000
                @cancelClosing()
                if i_period > 0
                    @timeoutId = setTimeout =>
                        @close()
                    , i_period

            close: ->
                @cancelClosing()
                @$el.classList.remove 'toast-open'

        created: ->
            toast = this
            @$on '$toast', (message, period)=>
                @open message, period

    Vue.toast = (message, period)->
        toast.$emit '$toast', message, period
