module.exports =
    isString: (s)->
        typeof s is 'string' or s instanceof String
