module.exports = (Vue, options)->
    Vue.filter 'date', (_d)->
        d = new Date _d
        y = d.getFullYear()
        m = d.getMonth() + 1
        d = d.getDate()
        "#{y}年#{m}月#{d}日"
