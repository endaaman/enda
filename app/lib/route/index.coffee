# _ = require 'lodash'
page = require 'page'
Vue = require 'vue'
_ = Vue.util

targetViews = {}
attachedModels = {}
currentContext = null

attachModel = (targetViewName, modelClass)->
    resolved = {}

    model = new modelClass
        computed:
            $context:
                get: -> currentContext

    model.$mount targetViews[targetViewName].el
    attachedModels[targetViewName] = model
    model


detachModel = (targetViewName)->
    attachedModels[targetViewName]?.$destroy? false

updatePage = (pastRoute, nextRoute, context)->
    currentContext = context

    if pastRoute is nextRoute
        return true
    targetViewNames = Object.keys(nextRoute.views).concat(Object.keys(pastRoute.views))

    # make uniq
    targetViewNames = targetViewNames.filter (value, index, self)->
        self.indexOf(value) is index

    for targetViewName in targetViewNames
        if not targetViews[targetViewName]
            continue
        nextModelClass = nextRoute.views[targetViewName] or null
        pastModelClass = pastRoute.views[targetViewName] or null

        flag = (!!pastModelClass+0) + (!!nextModelClass+0)*2
        switch flag
            when 0 # past, next = -, -
                continue
            when 1 # past, next = +, -
                detachModel targetViewName
            when 2 # past, next = -, +
                attachModel targetViewName, nextModelClass
            when 3 # past, next = +, +
                if nextModelClass is pastModelClass
                else
                    detachModel targetViewName
                    attachModel targetViewName, nextModelClass
    true

currentRoute = null
ancesterRoute = null


class Route
    constructor: (param)->
        # sanitize
        param ?= {}
        param.views = param.views or {}

        # setup

        @ancester = !!param.ancester
        if @ancester
            ancesterRoute = this

        @parent = param.parent or ancesterRoute or null
        @views =  if @parent then _.extend (_.extend {}, @parent.views), param.views else param.views

        @url = do =>
            if @parent and @parent isnt this
                return @parent.url + param.url
            else
                return param.url or ''
        @abstract = !@url

        if @abstract
            return

        page @url, (context)=>
            success = updatePage currentRoute, this, context
            currentRoute = this
            for name, model of attachedModels
                model.$emit '$pageUpdated'



    route: (param)->
        new Route param

    child: (param)->
        param.parent = this
        new Route param

    sib: (param)->
        param.parent = this.parent
        new Route param

currentRoute = new Route


module.exports = (Vue, options)->
    Vue.directive 'view',
        isLiteral: true
        bind: ->
            # TODO: check uniqueness of view by name
            targetViews[@expression] = this

    Vue.nextTick ->
        page()

    Vue.route = (param)->
        new Route param
