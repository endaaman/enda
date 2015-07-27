require './style/index.sass'


Vue = require 'vue'

marked = require 'marked'
hljs = require 'highlight.js'

renderer = new marked.Renderer()
renderer.link = (href, title, text)->
    external = not /^\//.test href
    usePrefix = external and not /^http/.test text
    target = if external then ' target="_blank"' else ''
    prefix = if usePrefix then "<i class=\"fa fa-fw fa-external-link\"></i> " else ''
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


router = require './lib/router'
auth = require './lib/auth'
meta = require './lib/meta'
loader = require './lib/loader'

Vue.use router.plugin
Vue.use require './component/editor'

router.route require './routes'
router.events.on '$pageUpdated', meta.handler

app = require './app'

start = ->
    router.start()
    loader.hide()

loader.show()
auth.check().then start, start
