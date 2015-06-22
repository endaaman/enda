
require './style/index.sass'


marked = require 'marked'
hljs = require 'highlight.js'


renderer = new marked.Renderer()
renderer.link = (href, title, text)->
    target = ' target="_blank"'
    title = if title then " title=\"#{title}\"" else ''
    href= " href=\"#{href}\""
    "<a#{href}#{target}#{title}><i class=\"fa fa-fw fa-external-link\"></i> #{text}</a>"


marked.setOptions
    highlight: (code, lang, callback)->
        hljs.highlight(lang, code).value
    renderer: renderer


Vue = require 'vue'
Vue.use require './lib/dateformat'
Vue.use require './lib/editor'
Vue.use require './lib/toast'
Vue.use require './lib/route'

app = new (require './component/root')
    el: 'body'

require './route'
