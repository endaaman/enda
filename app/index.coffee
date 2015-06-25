require './style/index.sass'

marked = require 'marked'
hljs = require 'highlight.js'

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
        hljs.highlight(lang, code).value
    renderer: renderer


Vue = require 'vue'
spaseo = require 'spaseo.js'

spaseo.wrap (cb)->
    Vue.nextTick ->
        cb()

Vue.use require './lib/route'
Vue.use require './lib/dateformat'
Vue.use require './lib/editor'

Vue.use require './lib/root'
Vue.use require './lib/toast'
Vue.use require './lib/loading'


require './route'
