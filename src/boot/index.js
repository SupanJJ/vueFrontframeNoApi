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
import BootContextMenu from "@/boot/plugins/contextmenu";
import BootEcharts from "@/boot/plugins/echarts";
import BootVCalendar from "@/boot/plugins/vcalendar";
import BootVUpload from "@/boot/plugins/vupload";
import BootDragResize from "@/boot/plugins/dragResize";
import BootFullScreen from "@/boot/plugins/fullscreen";
import BootVue2Org from "@/boot/plugins/vue2orgtree";
import BootVueQuillEditor from "@/boot/plugins/quilleditor";
//Out modules
import BootModules from "@/boot/modules";
import "./directive"
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
    BootContextMenu,
    BootEcharts,
    BootVCalendar,
    BootVUpload,
    BootDragResize,
    BootFullScreen,
    BootVue2Org,
    BootVueQuillEditor,
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