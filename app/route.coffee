Vue = require 'vue'

Vue.route
    ancester: true
    views:
        sidebar: require './component/sidebar'

Vue.route
    url: '/'
    views:
        content: require './component/home'

Vue.route
    url: '/about'
    views:
        content: require './component/about'

Vue.route
    url: '/login'
    views:
        content: require './component/login'



Vue.route
    url: '/memo'
    views:
        content: require('./component/memo/list')
.child
    url: '/new'
    views:
        content: require('./component/memo/edit')
.sib
    url: '/:title'
    views:
        content: require('./component/memo/show')
.child
    url: '/edit'
    views:
        content: require('./component/memo/edit')


# this should be placed last
Vue.route
    url: '*'
    views:
        content: require './component/404'
