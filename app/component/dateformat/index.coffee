moment = require 'moment'

module.exports = (Vue, options)->
    Vue.filter 'date', (date, format)->
        moment(date).format format
