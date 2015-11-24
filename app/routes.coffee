u = require './util'

main = [
    url: '/'
    data:
        meta:
            title: 'HOME'
            description: 'endaaman\'s personal webpage'
    views:
        content: require './view/home'
,
    url: '/memo'
    subs: [
        url: '/'
        data:
            meta:
                title: 'MEMO'
                description: 'endaaman\'s memoranda'
        views:
            content: require './view/memo/list'
    ,
        url: '/new'
        data:
            next: '/'
        views:
            content: require './view/memo/edit'
    ,
        url: '/:title'
        views:
            content: require './view/memo/detail'
        subs: [
            url: '/'
            views:
                memo_detail: require './view/memo/show'
        ,
            url: '/edit'
            data:
                next: '/'
            views:
                memo_detail: require './view/memo/edit'
        ]
    ]
,
    url: '/file'
    data:
        next: '/'
    views:
        content: require './view/file'
,
    url: '/login'
    views:
        content: require './view/login'
,
    url: '/logout'
    views:
        content: require './view/logout'
,
    url: '*'
    views:
        content: require './view/404'
]


routes = [
    views:
        root: require './view/root'
    subs: u.copy main
]


module.exports = routes
