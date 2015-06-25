Vue = require 'vue'

Vue.route
    ancester: true
    views:
        sidebar: require './view/sidebar'

Vue.route
    url: '/'
    views:
        content: require './view/home'

Vue.route
    url: '/about'
    views:
        content: require './view/about'

Vue.route
    url: '/login'
    views:
        content: require './view/login'



Vue.route
    url: '/memo'
    views:
        content: require('./view/memo/list')
.child
    url: '/new'
    views:
        content: require('./view/memo/edit')
.sib
    url: '/:title'
    views:
        content: require('./view/memo/show')
.child
    url: '/edit'
    views:
        content: require('./view/memo/edit')


# this should be placed last
Vue.route
    url: '*'
    views:
        content: require './view/404'
