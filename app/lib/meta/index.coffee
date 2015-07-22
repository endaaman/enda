config = require '../../config'


applyMetaTag = (name, content)->
    el = document.querySelector "meta[name=\"#{name}\"]"

    if not content
        if el
            el.parentElement.removeChild el
    else
        if not el
            el  = document.createElement 'meta'
            el.setAttribute 'name', name
            document.head.appendChild el
        el.setAttribute 'content', content


setTitle = (title)->
    if title
        newTitle = title + ' | ' + config.siteName
    else
        newTitle = config.siteName

    document.title = newTitle
    applyMetaTag 'og:title', newTitle

setSiteName = (siteName)->
    applyMetaTag 'og:site_name', siteName


setType = (_type)->
    applyMetaTag 'og:type', _type

setImage = (url)->
    applyMetaTag 'og:image', url

setDescription = (description)->
    applyMetaTag 'description', description
    applyMetaTag 'og:description', description


setKeywords = (keywords)->
    if Array.isArray keywords
        strKeywords = keywords.join ','
    else
        strKeywords = ''

    applyMetaTag 'keywords', strKeywords



module.exports = new ->
    @set = (meta)->
        m = meta or {}
        setType m.type or 'website'
        setSiteName m.site_name or config.siteName
        setTitle m.title
        setImage m.image or config.baseUrl + require("../../assets/endaaman.png")
        setDescription m.description
        setKeywords m.keywords

    @handler = (next, past)=>
        @set next.data.meta

    this
