import urijs from 'urijs'

let uri = null

export function configureUri(fullUrl) {
  uri = urijs(fullUrl)
}

export default function() {
  if (uri) {
    return (uri)
  } else {
    throw new Error('You must configureUri() before')
  }
}
