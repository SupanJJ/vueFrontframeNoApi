import Vue from "vue";

Vue.directive('throttle', {
    bind: (el, binding) => {
      let throttleTime = binding.value; // 防抖时间
      if (!throttleTime) { // 用户若不设置防抖时间，则默认3s
        throttleTime = 3000;
      }
      let cbFun;
      el.addEventListener('click', event => {
        if (!cbFun) { // 第一次执行
          cbFun = setTimeout(() => {
            cbFun = null;
          }, throttleTime);
        } else {
          event && event.stopImmediatePropagation();
        }
      }, true);
    }
  });