require './style/index.sass'


Vue = require 'vue'

marked = require 'marked'
hljs = require 'highlight.js'
spaseo = require 'spaseo.js'

renderer = new marked.Renderer()
renderer.link = (href, title, text)->
    internal = /^\//.test href
    target = if internal then '' else ' target="_blank"'
    prefix = if internal then '' else "<i class=\"fa fa-fw fa-external-link\"></i> "
    title = if title then " title=\"#{title}\"" else ''
    href= " href=\"#{href}\""

    "<a#{href}#{target}#{title}>#{prefix}#{text}</a>"

marked.setOptions
    highlight: (code, lang, callback)->
        hljs.highlight(lang or '', code).value
    renderer: renderer

spaseo.wrap (cb)->
    Vue.nextTick ->
        cb()


# Vue.use require './lib/route'
Vue.use require './directive/dateformat'
Vue.use require './directive/editor'

Vue.use require './component/toast'
Vue.use require './component/loader'
Vue.use require './component/sidebar'

Vue.use require './view/home'
Vue.use require './view/login'
Vue.use require './view/about'
Vue.use require './view/memo'
Vue.use require './view/404'

app = new Vue
    el: 'body'
    template: do require './root.jade'
    data:
        views:
            content: null

page = require 'page'

page '/', (ctx)->
    app.views.content = 'home'
page '/memo', (ctx)->
    app.views.content = 'memo-list'
page '/login', (ctx)->
    app.views.content = 'login'
page '/about', (ctx)->
    app.views.content = 'about'
page '*', (ctx)->
    app.views.content = '_404'

page()
