page = require 'page'

targetViews = {}
attachedModels = {}
currentContext = null
__reload = false

EventEmitter2 = (require 'eventemitter2')
events = new EventEmitter2()

extend = (a, b, copy)->
    target = if copy then (extend {}, a, false) else a
    for k, v of b
        target[k] = v
    target


emitEvent = (ev, next, past)->
    events.emit ev, next, past
    for name, model of attachedModels
        model.$emit ev, next, past


updatePage = (nextRoute, pastRoute, context)->
    emitEvent '$pageUpdating', nextRoute, pastRoute

    currentContext = context

    if pastRoute is nextRoute
        return true

    attachedViews = {}

    for route in nextRoute.familyLine
        for viewName, modelClass of route.views
            if attachedViews[viewName]
                console.warn "Attached vb twice to the view whose name is `#{viewName}`"

            if model = attachedModels[viewName]
                if not __reload and model.__proto__.constructor is modelClass
                    attachedViews[viewName] = true
                    continue
                else
                    model.$destroy true

            if targetView = targetViews[viewName]
                model = new modelClass
                    replace: !modelClass.options.replace? or !!modelClass.options.replace
                    computed:
                        $context:
                            get: -> currentContext

                model.$mount().$appendTo targetView.el
                attachedModels[viewName] = model
                attachedViews[viewName] = true
            else
                console.warn "The view named `#{viewName}` does not exist"

    for viewName, model of attachedModels
        if not attachedViews[viewName]
            model.$destroy true
            delete attachedModels[viewName]

    emitEvent '$pageUpdated', nextRoute, pastRoute
    __reload = false
    true

handlers = []

class Route
    @routes: {}
    @currentRoute = new Route
    @registerRoutes: ->
        for url, route of Route.routes
            route.register()

    constructor: (params)->
        params ?= {}

        @parent = params.parent or null
        @views = params.views or {}
        @data = do =>
            base = params.data or {}
            if @parent
                extend @parent.data, base, true
            else
                base

        @url = do =>
            if @parent and @parent isnt this
                @parent.url + params.url
            else
                params.url or ''

        @familyLine = if @parent? then @parent.familyLine.concat [this] else [this]

        @abstract = !@url or !!params.abstract

        if Array.isArray params.subs
            for sub in params.subs
                sub.parent = this
                new Route sub
                if sub.url is '/'
                    @abstract = true

        if not @abstract
            if Route.routes[@url]?
                throw new Error "Tried to define dupricated routes `#{@url}`"
            Route.routes[@url] = this

    route: (params)->
        new Route params

    register: ->
        page @url, (context, next)=>
            updatePage this, Route.currentRoute, context
            Route.currentRoute = this



module.exports = new class
    _started: false
    go: (path, reload)->
        __reload = !!reload
        page path

    Route: Route
    events: events
    setHandler: (handler)->
        Route.handler = handler
    plugin: (Vue, options)=>
        options ?= {}
        viewName = ((typeof options.viewName is 'string') and options.viewName) or 'view'

        Vue.directive viewName,
            isLiteral: true
            bind: ->
                name = @expression
                if targetViews[name]?
                    throw new Error "The view whose name is `#{name}` is already binded to the document"
                targetViews[name] = this
            unbind: ->
                delete targetViews[@expression]

        if options.autoStart
            Vue.nextTick =>
                @start()

    start: (Vue)->
        if not @_started
            Route.registerRoutes()
            page()
        else
            console.warn 'Tried to start routing twice'
        @_started = true


    route: (params)->
        if Array.isArray params
            for p in params
                new Route p
        else
            new Route params
