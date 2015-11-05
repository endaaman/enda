require 'font-awesome/css/font-awesome.css'


window._Promise = window.Promise
window.Promise = require 'bluebird'

require 'page'
require 'eventemitter2'

Vue = require 'vue'
require 'vue-validator'
require 'vue-resource'
require 'spaseo.js'
spaseo = require 'spaseo.js'
marked = require 'marked'
hljs = require 'highlight.js'


spaseo.wrap (cb)->
    Vue.nextTick ->
        console.log 'noti'
        cb()


renderer = new marked.Renderer()
renderer.link = (href, title, text)->
    external = not /^\//.test href
    usePrefix = external and (not /^http/.test text) and (not /.+\..+/.test text)
    target = if external then ' target="_blank"' else ''
    prefix = if usePrefix then '<i class=\"fa fa-external-link\"></i>' else ''
    title = if title then " title=\"#{title}\"" else ''
    href= " href=\"#{href}\""
    "<a#{href}#{target}#{title}>#{prefix}#{text}</a>"


marked.setOptions
    renderer: renderer
    highlight: (code, lang, callback)->
        if lang
            try
                hljs.highlight(lang, code).value
            catch
                code
        else
            code
