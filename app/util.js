
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

export function createPromiseWatchMiddleware() {
  const promises = []
  const middleware = () => (next) => (action) => {
    if (action && action.then) {
      promises.push(action)
    }

    return next(action)
  }
  middleware.wait = () => Promise.all(promises)

  return middleware
}

export function getGoogleFontsHref(fonts) {
  var family = Object.keys(fonts).map(function(name) {
    var details = fonts[name]
    name = name.replace(/\s+/g, '+')
    return typeof details === 'boolean'
      ? name
      : name + ':' + makeArray(details).join(',')
  }).join('|')

  return '//fonts.googleapis.com/css?family=' + family
}
