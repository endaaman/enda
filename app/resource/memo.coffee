Vue = require 'vue'
config = require '../config'

module.exports = Vue.resource "#{config.api}/memos/:id", {},
    update:
        method: 'PATCH'
