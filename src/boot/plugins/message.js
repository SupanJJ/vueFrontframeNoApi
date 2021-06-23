export default ({ Vue }) => {
    const Message = Vue.prototype.$message;
    Vue.prototype.$message = function (option) {
        if (typeof option == 'object') {
            if (option.type && option.type == 'error') {
                Message({
                    ...option,
                    duration: 0,
                    showClose: true
                });
            }
            else {
                Message({
                    ...option,
                    showClose: true
                });
            }
        } else if (typeof option == 'string') {
            Message({
                message: option,
                showClose: true
            });
        } else {
            Message(option);
        }
    }

    let sourceFuncs = ['success', 'warning', 'info', 'error', 'close', 'closeAll'];
    for (let i = 0; i < sourceFuncs.length; i++) {
        let type = sourceFuncs[i];
        Vue.prototype.$message[type] = Message[type];
    }
};