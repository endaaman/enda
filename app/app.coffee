Vue = require 'vue'

Vue.use (require './lib/router'), autoStart: false

Vue.use require './component/dateformat'
Vue.use require './component/editor'

Vue.use require './component/toast'
Vue.use require './component/loader'
Vue.use require './component/sidebar'
