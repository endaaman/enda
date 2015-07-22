require './style/index.sass'


Vue = require 'vue'

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
        if lang
            try
                hljs.highlight(lang, code).value
            catch
                code
        else
            code
    renderer: renderer


spaseo = require 'spaseo.js'
spaseo.wrap (cb)->
    Vue.nextTick ->
        cb()

auth = require './lib/auth'
router = require './lib/router'

Vue.use router.plugin
Vue.use require './component/dateformat'
Vue.use require './component/editor'

Vue.use require './component/toast'
Vue.use require './component/loader'

router.route require './routes'

app = new Vue
    el: 'body'
    template: do require './root.jade'

router.events.on '$pageUpdated', (require './lib/meta').handler

start = ->
    router.start()
    Vue.finishLoading()

Vue.startLoading()
auth.check().then start, start
