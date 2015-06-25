module.exports = (Vue, options)->
    new Vue
        el: 'body'
        template: do require './index.jade'
