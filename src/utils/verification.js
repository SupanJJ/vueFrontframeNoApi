/*
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2020-07-15 16:51:01
 * @LastEditors: supan
 * @LastEditTime: 2020-09-30 10:09:40
 */
/**
 * 验证信息
 * 规则：VER_开头，全大写，下划线分割，const申明，
 * 结构：
 * {
 *   Regex: 正则表达式
 *   Msg: 错误信息
 * }
 */

//身份证号码（含15位和18位）
export const VER_ID_CARD = {
    Regex: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
    Msg: '请输入正确的身份证号码'
};

// 手机号码或者电话号码
export const VER_PHONE_NUMBER = {
    Regex: /^((0\d{2,3}-\d{7,8})|(\d{7,8})|(\d{12})|(1(3|4|5|6|7|8|9)\d{9}))$/,
    Msg: '请输入正确的电话号码'
};
//大于等于0的数字
export const VER_POSITIVE = {
    Regex: /^\d+(\.{0,1}\d+){0,1}$/,
    Msg: '请输入非负数'
}

export const VER_NUMBERSTRING = {
    Regex: /^[0-9]+$/,
    Msg: '不能包含非数字字符'
}

