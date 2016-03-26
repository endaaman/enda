
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
  function asArray(arr) {
    return Array.isArray(arr) ? arr : [arr]
  }

  var family = Object.keys(fonts).map(function(name) {
    var details = fonts[name]
    name = name.replace(/\s+/g, '+')
    return typeof details === 'boolean'
      ? name
      : name + ':' + asArray(details).join(',')
  }).join('|')

  return '//fonts.googleapis.com/css?family=' + family
}
