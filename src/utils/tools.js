/**
 * 常用工具
 * 规则：名称尽量可以直观的表达该方法的用途！
 */

export function isArrayOrString(variable) {
    if (typeof variable === typeof [] || typeof variable === typeof "") {
        return true;
    }
    return false;
}

export function isArray(variable) {
    if (Object.prototype.toString.call(variable) === '[object Array]') {
        return true;
    } else {
        return false;
    }
    // if (typeof variable === typeof []) {
    //     return true;
    // }
    // return false;
}

export function formatObjPatchList(data, type = "replace") {
    let arr = [];
    if (typeof data === "object") {
        for (let key in data) {
            let item = {
                value: data[key],
                path: key,
                op: type
            };
            arr.push(item);
        }
    }

    return arr;
}
export function removePropertyOfNull(obj) {
    Object.keys(obj).forEach(item => {
        if (!obj[item]) delete obj[item]
    })
    return obj;
}

export function replacePropertyOfNullToEmpty(obj) {
    Object.keys(obj).forEach(item => {
        if (obj[item] == null || obj[item] == 'null') obj[item] = '';
    })
    return obj;
}
//将父对象的值依此传给
export function childCopyFather(childObj, fatherObj) {
    if (typeof childObj === "object" && typeof fatherObj === "object") {
        let keys = Object.keys(childObj);

        keys.forEach(e => {
            if (fatherObj[e] != undefined && fatherObj[e] != null) {
                childObj[e] = fatherObj[e];
            }
        });
    }

    return childObj;
}

//将父对象的值依此传给(子对象不为空则不覆盖)
export function childCopyFatherWithEmpty(childObj, fatherObj) {
    if (typeof childObj === "object" && typeof fatherObj === "object") {
        let keys = Object.keys(childObj);

        keys.forEach(e => {
            if (fatherObj[e] != undefined && fatherObj[e] != null) {
                if (childObj[e] == undefined || childObj[e] == null || childObj[e] == '') {
                    childObj[e] = fatherObj[e];
                }
            }
        });
    }

    return childObj;
}

export function isNullOrEmpty(val) {
    return (val === "" || val === undefined || val === null || val === 'null');
}

export function getBMI(height, weight) { //m, kg
    if (height > 0 && weight > 0) {
        return (weight / (height * height)).toFixed(1)
    }
    return null;
}

//是否外部链接
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

//通过身份证号码获取出生日期
//输出格式为:1990-01-01
export function getBirthFromIDCard(idCard) {
    let birthday = "";
    if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
            birthday = "19" + idCard.slice(6, 12);
        } else if (idCard.length == 18) {
            birthday = idCard.slice(6, 14);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    return birthday;
}

//通过身份证号码获取性别
export function getSexFromIDCard(idCard) {
    let sexStr = "";
    if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
        sexStr = "男";
    } else {
        sexStr = "女";
    }
    return sexStr;
}
//通过身份证号码获取年龄
export function getAgeFromIDCard(idCard) {
    let birthYearSpan = idCard.length === 15 ? 2 : 4;
    let year =
        (birthYearSpan === 2 ? "19" : "") + idCard.substr(6, birthYearSpan);
    let month = idCard.substr(6 + birthYearSpan, 2);
    let day = idCard.substr(8 + birthYearSpan, 2);

    let now = new Date();
    let monthFloor =
        now.getMonth() + 1 < parseInt(month, 10) ||
        (now.getMonth() + 1 === parseInt(month, 10) &&
            now.getDate() < parseInt(day, 10)) ?
        1 :
        0;
    let age = now.getFullYear() - parseInt(year, 10) - monthFloor;
    if (age === 0) {
        let diffDay = Math.floor(
            (new Date().getTime() -
                new Date(year + "/" + month + "/" + day + " 00:00:00").getTime()) /
            (24 * 60 * 60 * 1000)
        );
        return diffDay + "天";
    } else {
        return age + "岁";
    }
}
//2019-01-01
export function getAgeFromBirthDay(birthDay) {
    let year = birthDay.substr(0, 4);
    let month = birthDay.substr(5, 2);
    let day = birthDay.substr(8, 2);

    let now = new Date();
    let monthFloor =
        now.getMonth() + 1 < parseInt(month, 10) ||
        (now.getMonth() + 1 === parseInt(month, 10) &&
            now.getDate() < parseInt(day, 10)) ?
        1 :
        0;
    let age = now.getFullYear() - parseInt(year, 10) - monthFloor;
    if (age === 0) {
        let diffDay = Math.floor(
            (new Date().getTime() -
                new Date(year + "/" + month + "/" + day + " 00:00:00").getTime()) /
            (24 * 60 * 60 * 1000)
        );
        return diffDay + "天";
    } else {
        return age + "岁";
    }
}
//针对本项目的element表格排序
export function getTableOrderStr({
    prop,
    order
}) {
    let orderStr = "";
    if (order == "ascending") {
        orderStr = `${prop}`;
    } else if (order == "descending") {
        orderStr = `-${prop}`;
    }
    return orderStr;
}

//引用类型深拷贝
export function deepCopy(variable) {
    return JSON.parse(JSON.stringify(variable));
}

//获取树形结构, 附加于该对象的children键下
export function getTree(
    data,
    pid = "0",
    childKey = "TreeID",
    parentKey = "TreePID",
    childrenKey = "children"
) {
    let tree = [];
    data.forEach(e => {
        if (e[parentKey] == pid) {
            e[childrenKey] = getTree(data, e[childKey]);
            tree.push(e);
        }
    });
    return tree;
}

export function trim(string) {
    if (string) {
        let str = string;
        str = str.replace(/^\s\s*/, "");
        let ws = /\s/;
        let i = str.length;
        while (ws.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    } else {
        return string;
    }
}

export function trimEnd(string, trimString) {
    let reg = new RegExp(`${trimString}$`, "g");
    string = string.replace(reg, "");
    return string;
}

//去除对象数组中的重复对象
export function distinctObjectArray(array) {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < array.length; i++) {
        var keys = Object.keys(array[i]);
        keys.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        var str = "";
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(array[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
            uniques.push(array[i]);
            stringify[str] = true;
        }
    }
    uniques = uniques;
    return uniques;
}

//字符串null转空
export function praseStrEmpty(str) {
    if (!str || str == "undefined" || str == "null") {
        return "";
    }
    return str;
}

//随机字符串，默认16位
export function randomString(len = 16) {
    let $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    let maxPos = $chars.length;
    let randomStr = "";
    for (let i = 0; i < len; i++) {
        randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return randomStr;
}

//获取年龄数字和单位
export function getAgeAndAgeUnit(ageWithUnit) {
    if (ageWithUnit) {
        let temp1 = ageWithUnit;
        let temp2 = ageWithUnit;
        let age = temp1.replace(/[^0-9]/ig, "");
        let unit = temp2.replace(/[0-9]/ig, "");

        return {
            age: age,
            unit: unit
        };
    } else {
        return {};
    }
}

//数组分组
export function groupArrayObj(arr, keyName) {
    let obj = {};
    if (!isArray(arr)) {
        return obj;
    }

    arr.forEach(e => {
        if (e[keyName]) {
            obj[e[keyName]] = [];
        }
    });

    arr.forEach(e => {
        if (e[keyName]) {
            obj[e[keyName]].push(e);
        }
    });

    return obj;
}

export function dateToString(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    var dateTime = year + "-" + month + "-" + day;
    return dateTime;
}

export function isEmptyObject(obj) {
    if (Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}
//删除数组中的对象
export function removeAaary(_arr, _obj) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (JSON.stringify(_arr[i]) == JSON.stringify(_obj)) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            } else if (i == length - 1) {
                _arr.pop(); //删除并返回数组的最后一个元素
                return _arr;
            } else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}
//删除数组中的 数据 不是对象
export function removeArray(_arr, _item) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i] == _item) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            } else if (i == length - 1) {
                _arr.pop(); //删除并返回数组的最后一个元素
                return _arr;
            } else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}



export function sortBy(field) {
    return function (a, b) {
        return a[field] - b[field];
    }
}


export function getUrlDistinctParam(url) { //去除重复参数 
    var new_url = "";
    var new_name_and_value = [];
    var where_i = [];
    var name_and_value = [];
    for (var i = 0; i < url.length; i++) {
        if (url.substring(i - 1, i) == "&" || url.substring(i - 1, i) == "?") {
            where_i.push(i)
        }
    }
    name_and_value.push(url.substring(where_i[where_i.length - 1], url.length));
    for (var j = 0; j < where_i.length - 1; j++) {
        name_and_value.push(url.substring(where_i[j], where_i[j + 1] - 1))
    }
    name_and_value.forEach(function (data) {
        if (new_name_and_value.indexOf(data) == -1) {
            new_name_and_value.push(data)
        }
    });
    new_url = url.substring(0, where_i[0]);
    new_name_and_value.forEach(function (value) {
        new_url = new_url + value + "&"
    });
    new_url = new_url.substring(0, new_url.length - 1);
    return new_url;
}

export function dateFormat(date, fmt) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "M+": (date.getMonth() + 1).toString(), // 月
        "D+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "m+": date.getMinutes().toString(), // 分
        "s+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}


export function numToStringForExcel(numm) {
    let stringArray = [];
    stringArray.length = 0;
    let numToStringAction = function (nnum) {
        let num = nnum - 1;
        let a = parseInt(num / 26);
        let b = num % 26;
        stringArray.push(String.fromCharCode(64 + parseInt(b + 1)));
        if (a > 0) {
            numToStringAction(a);
        }
    }
    numToStringAction(numm);
    return stringArray.reverse().join("");
}


export function stringToNumForExcel(a) {
    let str = a.toLowerCase().split("");
    let num = 0;
    let al = str.length;
    let getCharNumber = function (charx) {
        return charx.charCodeAt() - 96;
    };
    let numout = 0;
    let charnum = 0;
    for (let i = 0; i < al; i++) {
        charnum = getCharNumber(str[i]);
        numout += charnum * Math.pow(26, al - i - 1);
    };
    return numout;
}

export function stringToArray(data, fields) {
    fields.forEach((e) => {
        if (data[e] != "" && data[e] != null) {
            let arr = data[e] ? data[e].split("|") : [];
            data[e] = arr;
        } else {
            data[e] = [];
        }
    });
    return deepCopy(data);
}

export function arrayToString(data, fields) {
    fields.forEach((e) => {
        if (data[e]) {
            if (data[e].length == 0) {
                data[e] = "";
            }
            if (data[e].length == 1) {
                if (data[e][0] == "") {
                    data[e] = "";
                }
            }
            if (data[e] != "" && data[e] != null) {
                let arr = deepCopy(data[e]);
                data[e] = arr ? arr.join("|") : "";
            }
        } else {
            data[e] = '';
        }
    });
    return deepCopy(data);
}
export function nullToEmpty(data, fields) {
    fields.forEach((e) => {
        if (data[e] == null) {
            data[e] = "";
        }
    });
    return deepCopy(data);
}

export function isInArray(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}
export function isLastInArray(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (value === arr[arr.length - 1]) {
            return true;
        }
    }
    return false;
}
export function goNextFlag(flag, inputList) {
    try {
        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i] == flag) {
                if (inputList[i + 1]) {
                    return inputList[i + 1];
                }
            }
        }
        return '';
    } catch {
        return '';
    }
}

export function getBase64(url) {
    return new Promise((resolve, reject) => {
        var Img = new Image();
        var dataURL = '';
        Img.setAttribute('crossOrigin', 'anonymous');
        Img.src = url + '?v=' + Math.random();
        Img.onload = function () {
            // 要先确保图片完整获取到，这是个异步事件
            var canvas = document.createElement('canvas'); // 创建canvas元素
            var width = Img.width; // 确保canvas的尺寸和图片一样
            var height = Img.height;
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(Img, 0, 0, width, height); // 将图片绘制到canvas中
            dataURL = canvas.toDataURL('image/bmp'); // 转换图片为dataURL
            resolve(dataURL);
        }
    })
}


export function isChinese(s) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    if (!patrn.exec(s)) {
        return false;
    } else {
        return true;
    }
}


export function print(content, style, w = null, h = null) {
    // Fixes dual-screen position                         Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    w = +w === 0 ? width : w;
    h = +h === 0 ? height : h;
    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    var myWindow = window.open("", "打印", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
    // var style = "<style type='text/css'>table.gridtable {font-family: verdana,arial,sans-serif;font-size:11px;color:#333333;border-width: 1px;border-color: #666666;border-collapse: collapse;}table.gridtable th {border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #dedede;}table.gridtable td {border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff;}</style>";
    myWindow.document.write(content + style);
    myWindow.focus();
    myWindow.document.close(); //关闭document的输出流, 显示选定的数据

    myWindow.print(); //打印当前窗口

    return myWindow;
}


export function formatJson(filterVal, jsonData) {
    return jsonData.map((v) =>
        filterVal.map((j) => {
            if (j === "timestamp") {
                return parseTime(v[j]);
            } else {
                return v[j];
            }
        })
    );
}


export function getTableSearchShow(userID, table) {
    let lastSQUserStorage = localStorage.getItem("lastSQUser");
    if (lastSQUserStorage == userID) {
        let lastTableSearchShowStorage = localStorage.getItem(table);
        if (lastTableSearchShowStorage) {
            if (lastTableSearchShowStorage == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
}

export function setTableSearchShow(userID, type, table) {
    localStorage.setItem("lastSQUser", userID);
    if (type) {
        localStorage.setItem(table, 1);

    } else {
        localStorage.setItem(table, 0);
    }
}

export function sortByTime(data, column) {
    return data.sort(function (a, b) {
        let x = a[column];
        let y = b[column];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0))
    })
}