import express from 'express'
import { createSitemap } from 'sitemap'

import React, {createElement as $} from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { rewind } from 'react-helmet'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'

import routes from '../app/routes'
import configureStore from '../app/store/configure'
import { setToken, unsetToken } from '../app/actions/token'
import { getMemos } from '../app/actions/memo'
import { configureHttp } from '../app/lib/http'

const webpackIsomorphicTools = global.webpackIsomorphicTools
const isProd = process.env.NODE_ENV === 'production'

function checkFromCrowler(ua) {
  const botExps = [
    /googlebot/i,
    /yahoo/i,
    /bingbot/i,
    /hatena/i,
  ]
  return !!botExps.find((exp)=> exp.test(ua))
}

function buildHtml(head, script, content, initialState) {
  return `<!doctype html>
<html>
  <head>
    ${head}
  </head>
  <body>
    <div id="app">${content}</div>
    <script>
      window.__initial_state__ = ${JSON.stringify(initialState, null, isProd ? 0 : 2)}
    </script>
    ${script}
  </body>
</html>`
}

function buildSitemap(hostname, memos) {
  const urls = [
    {
      url: '/page-1/',
      lastmodISO: (new Date()).toISOString(),
      changefreq: 'weekly',
    }
  ]

  for (const memo of memos) {
    if (memo.draft) {
      continue
    }
    const url = {
      url: `/memos/${memo.slug}`,
      lastmodISO: (new Date(memo.updated_at)).toISOString(),
      changefreq: 'weekly',
    }
    url.img = memo.image_url
    urls.push(url)
  }

  const sitemap = createSitemap({
    hostname: hostname,
    cacheTime: 3 * (60 * 60 * 1000), // x hours
    urls: urls
  })

  return sitemap.toString()
}


export default function(req, res, onError) {
  const apiRoot = /localhost/.test(req.hostname)
    ? 'http://localhost:3000'
    : `${req.protocol}://api.${req.hostname}`

  const store = configureStore({})
  configureHttp(store.getState, apiRoot)

  if (req.originalUrl === '/sitemap.xml') {
    res.header('Content-Type', 'application/xml');
    store.dispatch(getMemos())
    .then(()=> {
      const memos = store.getState().memo.items
      res.status(200).send(buildSitemap(`${req.protocol}://${req.hostname}`, memos))
      // res.status(200).send('sm')
    }, ()=> {
      res.status(500).send('something went wrong')
    })
    return
  }

  const history = createMemoryHistory()

  const fromCrowler = checkFromCrowler(req.headers['user-agent'])

  let locationList
  let unlisten
  if (fromCrowler) {
    locationList = []
    unlisten = history.listen(location => {
      locationList.push(location)
    })
  }

  match({routes, history, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (!renderProps) {
      res.status(404).send('Not found')
    } else {
      const render = ()=> {
        const provider = $(Provider, {store: store}, $(RouterContext, renderProps))
        // NOTE: Do not show token in prerendered html
        store.dispatch(unsetToken())
        const initialState = store.getState()
        const content = renderToString(provider)

        if (fromCrowler) {
          unlisten()
          const lastLocation = locationList[locationList.length - 1]
          if (lastLocation.action === 'REPLACE') {
            res.redirect(302, lastLocation.pathname + lastLocation.search)
            return
          }
        }
        const head = rewind()
        const assets = webpackIsomorphicTools.assets()

        const heads = []
        heads.push(head.title.toString())
        heads.push(head.meta.toString())
        heads.push(head.link.toString())

        for (let name in assets.styles) {
          let path = assets.styles[name]
          heads.push(` <link rel="stylesheet" href="${path}"/>`)
        }

        const scripts = []
        for (let name in assets.javascript) {
          let path = assets.javascript[name]
          scripts.push(`<script src="${path}"></script>`)
        }

        const html = buildHtml(heads.join('\n'), scripts.join('\n'), content, initialState)
        let notFound = head.meta.toString().indexOf('content="404"') > -1
        res.status(notFound ? 404 : 200).send(html)
      }
      if (req.cookies.token) {
        store.dispatch(setToken(req.cookies.token))
      }
      const params = {
        dispatch: store.dispatch,
        params: renderProps.params,
      }
      const promises = renderProps.components.map(c => {
        const hasLoadProps = c && c.loadProps && typeof c.loadProps === 'function'
        return hasLoadProps
          ? c.loadProps(params)
          : Promise.resolve()
      })
      Promise.all(promises).then(render, onError)
    }
  })
}
