/**
 * 样例数据结构，根据模块进行文件分割
 * 规则：全部大写，下划线分割，const申明
 * 用途：可用于组件的数据初始化
 * 使用：1.导入到对应组件后，应该用解开符号（...）释放到对应的参数中，比如：
 *        my_data: { ...DEFAULT_EXAMPLE_DATA }
 *      2.多个默认结构导入时，如果重名，可以通过：
 *        import { A_DEFAULT_EXAMPLE_DATA as DEFAULT_EXAMPLE_DATA } from 'a.js'
 *        import { B_DEFAULT_EXAMPLE_DATA as DEFAULT_EXAMPLE_DATA } from 'b.js'
 *      3.建议在出口文件中统一导出，index.js
 */
export const DEFAULT_EXAMPLE_DATA = {
    filter: '搜索区域',
    operate: '表格操作区域',
    table: '表格显示区域',
}