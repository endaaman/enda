require('babel-polyfill')
require('babel-register')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

if (process.env.NODE_ENV === 'production') {
  require('./prod')
} else {
  require('./dev')
}
