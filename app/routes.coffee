module.exports = [
    url: '/'
    data:
        meta:
            title: 'HOME'
            description: 'endaaman\'s personal webpage'
    views:
        content: require './view/home'
        sidebar: require './view/sidebar'
,
    url: '/memo'
    views:
        sidebar: require './view/sidebar'
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
            restricted: true
        views:
            content: require './view/memo/edit'
    ,
        url: '/:title'
        subs: [
            url: '/'
            views:
                content: require './view/memo/show'
        ,
            url: '/edit'
            data:
                restricted: true
            views:
                content: require './view/memo/edit'
        ]
    ]
,
    url: '/login'
    views:
        content: require './view/login'
        sidebar: require './view/sidebar'
,
    url: '/logout'
    views:
        content: require './view/logout'
        sidebar: require './view/sidebar'
,
    url: '*'
    views:
        content: require './view/404'
        sidebar: require './view/sidebar'
]
