module.exports = (Vue, options)->
    Vue.component 'about',
        replace: true
        template: do require './index.jade'
