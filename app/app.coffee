Vue = require 'vue'

app = new Vue
    el: '#app'
    replace: true
    template: do require './app.jade'
