export default ({ Vue }) => {
    const on = Vue.prototype.$on
    Vue.prototype.$on = function (event, func) {
        let previous = 0
        let newFunc = func
        if (event === 'click') {
            newFunc = function () {
                const now = new Date().getTime()
                if (previous + 2000 <= now) {
                    func.apply(this, arguments)
                    previous = now
                }
            }
        }
        on.call(this, event, newFunc)
    }
};