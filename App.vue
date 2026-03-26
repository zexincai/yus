<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    // #ifdef APP
    let userInfo = uni.getStorageSync('userInfo')
    if (!userInfo || !userInfo.token) {
      uni.reLaunch({
        url: '/pages/login/index',
        success() {
          plus.navigator.closeSplashscreen()
        },
      })
    } else {
      plus.navigator.closeSplashscreen()
    }
    // #endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import '@/style/index.scss';

page {
  background-color: $bg-color;
}
</style>
