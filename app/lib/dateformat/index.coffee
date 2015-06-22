moment = require 'moment'

# module.exports = function(Vue, options) {
#   return Vue.filter('date', ["date", "format", function(date, format) {
#     var f;
#     return moment(date).format(format);
#   }]);
# };

module.exports = (Vue, options)->
    Vue.filter 'date', (date, format)->
        moment(date).format format
        
