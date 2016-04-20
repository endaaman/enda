import React from 'react'
import { Link } from 'react-router'
import CodeBlock from './components/code_block'


function asArray(v) {
  return Array.isArray(v) ? v : [v]
}

export function isOnServer() {
  return !!(typeof process === 'object' && process + '' === '[object process]')
}

export function keyBy(list, keyName) {
  const result = {}
  list.forEach(function(item) {
      result[item[keyName]] = item
  })
  return result
}

export function getGoogleFontsHref(fonts) {
  var family = Object.keys(fonts).map(function(name) {
    var details = fonts[name]
    name = name.replace(/\s+/g, '+')
    return typeof details === 'boolean'
      ? name
      : name + ':' + asArray(details).join(',')
  }).join('|')

  return '//fonts.googleapis.com/css?family=' + family
}

export function findMemo(memos, path, failResult = null) {
  const result = memos.find((memo)=> {
    let found = false
    if (path === memo._id) {
      found = true
    }
    if (path === memo.title) {
      found = true
    }
    return found
  })
  return result || failResult
}


function isInnerLink(uri) {
  const proxyedPaths = [
    /^\/api\/.*/,
    /^\/static\/.*/,
  ]

  for (let i in proxyedPaths) {
    if (proxyedPaths[i].test(uri)) {
      return false
    }
  }

  if (/^\/.*/.test(uri)) {
    return true
  }

  return false
}


export function getMarkdownRenderers() {
  return {
    Link: props => {
      if (isInnerLink(props.href)) {
        return (<Link to={props.href}>{props.children}</Link>)
      } else {
        return (<a href={props.href} target="_black">{props.children}</a>)
      }
    },
    CodeBlock: CodeBlock
  }
}
