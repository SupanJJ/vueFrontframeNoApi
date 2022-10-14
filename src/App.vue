<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
      return {
          timer: null,
      };
  },
  mounted() {
      //窗口尺寸改变
      //window.addEventListener("resize", () => this.Refresh());
  },
  methods: {
      Refresh() {
          this.timer && clearTimeout(this.timer);
          this.timer = setTimeout(() => {
              this.$router.go(0);
          }, 3000);
      },
  },
  destroyed() {
      // 销毁
      //window.removeEventListener("resize", this.Refresh());
      this.timer && clearTimeout(this.timer);
  },
};
</script>

<style></style>
