Vue = require 'vue'
config = require '../../config'

module.exports = Vue.extend
    template: do require './index.jade'

    data: ->
        baseUrl: config.baseUrl

        tmpFiles: null
        shownDeleteModal: false
        shownRenameModal: false
        deletingFilename: ''
        renamingFilename: ''
        newFilename: ''
    methods:
        selectFiles: (e)->
            @tmpFiles = e.target.files
        clearFiles: ->
            @tmpFiles = null

        performUpload: ->
            data = new FormData
            for file in @tmpFiles
                data.append file.name, file

            @$loader()
            @$http.post "#{config.api}/files", data
            .then =>
                @$loader false
                @$router.reload()
                @$toast 'Uploaded'
                @clearFiles()
            , (err)=>
                @$loader false
                @$toast 'Failed'
                console.warn err

        openDeleteModal: (filename)->
            @shownDeleteModal = true
            @deletingFilename = filename

        performDelete: ->
            @$loader()
            @$http.delete "#{config.api}/files/#{@deletingFilename}"
            .then =>
                @$loader false
                @$router.reload()
                @$toast 'Deleted'
            , (err)=>
                @$loader false
                @$toast 'Failed'
                console.warn err

        openRenameModal: (filename)->
            @shownRenameModal = true
            @renamingFilename = filename
            @newFilename = filename

        performRename: (e)->
            e.preventDefault()
            @$http.post "#{config.api}/files/rename",
                filename: @renamingFilename
                new_filename: @newFilename
            .then =>
                @$loader false
                @$router.reload()
                @$toast 'Renamed'
            , =>
                @$loader false
                @$toast 'Failed'

    created: ->
        @$resolve
            files: @$http.get("#{config.api}/files").then (res)->
                res.data
