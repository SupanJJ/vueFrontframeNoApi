/*
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2021-02-25 15:54:55
 * @LastEditors: supan
 * @LastEditTime: 2021-02-25 16:40:15
 */
// Main
import BootAxios from "@/boot/main/axios"; //axios
import BootAuth from "@/boot/main/auth"; //登录
import BootElement from "@/boot/main/element"; //饿了么

// Plugins
import BootThrottle from "@/boot/plugins/throttle";
import BootMessage from "@/boot/plugins/message"; //message
import BootBus from "@/boot/plugins/bus"; //
import BootIcon from "@/boot/plugins/icon";
import BootMoment from "@/boot/plugins/moment"; //new date()
import BootClipboard from "@/boot/plugins/clipboard"; //功能不明

//Out modules
import BootModules from "@/boot/modules";

// 注册启动器
const bootItems = [
    BootAxios, 
    BootAuth, 
    BootElement, 
    // BootThrottle,
    BootMessage,
    BootBus, 
    BootIcon,
    BootMoment,
    BootClipboard,
    BootModules
];

export default ({ router, store, Vue }) => {
    for (let i = 0; i < bootItems.length; i++) {
        if (typeof bootItems[i] !== 'function') {
            continue
        }

        try {
            bootItems[i]({
                router,
                store,
                Vue
            })
        } catch (err) {
            if (err && err.url) {
                window.location.href = err.url
                return
            }

            console.error('Boot error:', err)
            return
        }
    }
}