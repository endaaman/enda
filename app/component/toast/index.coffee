module.exports = (Vue, options)->
    toasts = []
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

                # auto close: not provided or set positive
                i_period = Math.abs((parseInt period) or 4000)
                @cancelClosing()
                if i_period > 0
                    @timeoutId = setTimeout =>
                        @close()
                    , i_period

            close: ->
                @cancelClosing()
                @$el.classList.remove 'toast-open'

        created: ->
            toasts.push this
        destroyed: ->
            if (idx = toasts.indexOf this) > 0
                delete toasts[idx]

    Vue.toast = (message, period)->
        for toast in toasts
            toast.open message, period
