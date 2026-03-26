<template>
    <view class="agreement-container">
        <web-view src="https://yuq.fenaor.com/serviceAgreement?appId=wxc65bb3c6e7698487"></web-view>
        <!-- <view class="agreement-title">用户服务协议</view>
        <view class="agreement-date">更新日期：{{ updateDate }}</view> -->
        <!-- <scroll-view scroll-y class="agreement-content">
            <view class="agreement-section">
                <view class="section-title">一、引言</view>
                <view class="section-content">
                    欢迎您使用本应用服务。为保障您的合法权益，请您在注册或使用本服务前，仔细阅读并充分理解本协议的全部内容。一旦您注册、登录或使用本服务，即视为您已阅读、理解并同意受本协议的约束。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">二、服务内容</view>
                <view class="section-content">
                    本应用为用户提供包括但不限于信息浏览、内容发布、互动交流等服务。具体服务内容以实际提供为准。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">三、用户注册与账户管理</view>
                <view class="section-content">
                    1. 用户在使用本服务前需注册账户，并保证所填写信息真实、准确、完整。<br />
                    2. 用户应妥善保管账户和密码，不得将账户、密码转让或出借他人使用。因用户自身原因导致的账户安全问题，由用户自行承担责任。<br />
                    3. 如发现任何未经授权使用您账户的情况，请及时通知我们。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">四、用户权利与义务</view>
                <view class="section-content">
                    1. 用户有权按照本协议约定使用本服务。<br />
                    2. 用户承诺遵守国家法律法规，不得利用本服务从事任何违法违规活动，包括但不限于发布违法信息、侵犯他人合法权益等。<br />
                    3. 用户不得干扰本服务的正常运行，不得对本服务进行反向工程、反编译等操作。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">五、隐私保护</view>
                <view class="section-content">
                    我们非常重视对用户个人信息的保护，相关内容详见《隐私政策》。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">六、知识产权声明</view>
                <view class="section-content">
                    本应用及相关内容（包括但不限于文字、图片、音频、视频、界面设计、版面框架等）的知识产权归本应用或相关权利人所有。未经授权，用户不得以任何方式使用上述内容。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">七、免责声明</view>
                <view class="section-content">
                    1. 本应用将尽力保障服务的稳定与安全，但不对服务的持续性、无误性做出承诺。<br />
                    2. 因不可抗力或非本应用原因导致的服务中断或数据丢失，本应用不承担责任。<br />
                    3. 用户因使用本服务而产生的任何间接、特殊、偶然或后果性的损害，本应用不承担责任。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">八、协议的变更与终止</view>
                <view class="section-content">
                    1. 本应用有权根据需要随时修改本协议内容，并以适当方式进行公告或通知。变更后的协议自公告或通知之日起生效。<br />
                    2. 用户如不同意变更内容，应立即停止使用本服务。用户继续使用本服务的，视为接受变更后的协议。<br />
                    3. 如用户违反本协议约定，本应用有权随时中止或终止对用户的服务。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">九、法律适用与争议解决</view>
                <view class="section-content">
                    本协议的订立、执行与解释及争议的解决均应适用中华人民共和国法律。因本协议产生的争议，双方应友好协商解决；协商不成的，任何一方均可向本应用所在地有管辖权的人民法院提起诉讼。
                </view>
            </view>
            <view class="agreement-section">
                <view class="section-title">十、联系方式</view>
                <view class="section-content">
                    如您对本协议有任何疑问、意见或建议，请通过以下方式与我们联系：<br />
                    邮箱：[请填写您的联系邮箱]<br />
                    电话：[请填写您的联系电话]
                </view>
            </view>
        </scroll-view> -->
    </view>
</template>

<script setup>
import { onLoad, } from "@dcloudio/uni-app";
onLoad(() => {

})
</script>

<style lang="scss">
.agreement-container {
    padding: 30rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: $bg-color-white;
}

.agreement-title {
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20rpx;
}

.agreement-date {
    font-size: 26rpx;
    color: $text-disabled;
    text-align: center;
    margin-bottom: 30rpx;
}

.agreement-content {
    flex: 1;
    overflow: auto;
}

.agreement-section {
    margin-bottom: 40rpx;
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    color: $text-primary;
}

.section-content {
    font-size: 28rpx;
    color: $text-disabled;
    line-height: 1.6;
}
</style>