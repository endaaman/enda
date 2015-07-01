module.exports = (Vue, options)->
    Vue.component '_404',
        replace: true
        template: do require './index.jade'
