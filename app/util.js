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
    if (path === memo.title) {
      found = true
    }
    if (path === memo._id) {
      found = true
    }
    return found
  })
  return result || failResult
}
