<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    let userInfo = uni.getStorageSync("userInfo");
    console.log(' console.log("userInfo", userInfo);', userInfo);
    if (!userInfo || !userInfo.token) {
      uni.reLaunch({
        url: "/pages/login/index",
        success() {
          // #ifdef APP
          plus.navigator.closeSplashscreen();
          // #endif
        },
      });
    } else {
      // #ifdef APP
      plus.navigator.closeSplashscreen();
      // #endif
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@import "@/style/index.scss";

page {
  background-color: #152136;
}
</style>
