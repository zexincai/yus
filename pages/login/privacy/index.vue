<template>
    <view class="privacy-container">
        <!-- <view class="privacy-title">隐私政策</view>
        <view class="privacy-date">更新日期：{{ updateDate }}</view> -->
        <web-view src="https://app.usayuq.com/privacyPolicy"></web-view>
        <!-- <scroll-view scroll-y class="privacy-content">
            <view class="privacy-section">
                <view class="section-title">引言</view>
                <view class="section-content">
                    <view class="paragraph">
                        欢迎使用我们的应用程序。本隐私政策旨在向您说明我们如何收集、使用、存储和共享您的个人信息，以及您享有的相关权利。请您在使用我们的服务前，仔细阅读并了解本隐私政策的全部内容。
                    </view>
                    <view class="paragraph">
                        如果您不同意本隐私政策的任何内容，您应当立即停止使用我们的服务。当您使用我们的服务，即表示您同意本隐私政策的全部内容以及我们按照本隐私政策收集、使用、存储和共享您的相关信息。
                    </view>
                </view>
            </view>

            <view class="privacy-section">
                <view class="section-title">我们收集的信息</view>
                <view class="section-content">
                    <view class="paragraph">
                        <text class="bold">1. 您主动提供的信息：</text>当您注册账户、使用我们的服务或联系客服时，您可能会提供以下信息：
                    </view>
                    <view class="paragraph indent">
                        • 个人身份信息：如姓名、电话号码、电子邮件地址等；
                    </view>
                    <view class="paragraph indent">
                        • 账户信息：如用户名、密码、安全问题及答案等；
                    </view>
                    <view class="paragraph indent">
                        • 交易信息：如支付方式、订单记录等；
                    </view>
                    <view class="paragraph indent">
                        • 您通过客服或参与问卷调查时提供的其他信息。
                    </view>

                    <view class="paragraph">
                        <text class="bold">2. 我们自动收集的信息：</text>当您使用我们的服务时，我们可能会自动收集以下信息：
                    </view>
                    <view class="paragraph indent">
                        • 设备信息：如设备型号、操作系统版本、设备设置、唯一设备标识符等；
                    </view>
                    <view class="paragraph indent">
                        • 日志信息：如IP地址、浏览器类型、访问日期和时间、访问的页面等；
                    </view>
                    <view class="paragraph indent">
                        • 位置信息：如您的GPS位置、WLAN接入点、蓝牙和基站等信息；
                    </view>
                    <view class="paragraph indent">
                        • 应用使用情况：如您使用的功能、点击的链接、搜索的关键词等。
                    </view>
                </view>
            </view>

            <view class="privacy-section">
                <view class="section-title">我们如何使用您的信息</view>
                <view class="section-content">
                    <view class="paragraph">
                        我们可能将收集的信息用于以下目的：
                    </view>
                    <view class="paragraph indent">
                        • 提供、维护和改进我们的服务；
                    </view>
                    <view class="paragraph indent">
                        • 处理您的订单和请求；
                    </view>
                    <view class="paragraph indent">
                        • 向您发送服务通知和更新；
                    </view>
                    <view class="paragraph indent">
                        • 防止、检测和调查欺诈、安全漏洞和其他潜在的禁止或非法活动；
                    </view>
                    <view class="paragraph indent">
                        • 进行数据分析，以改善用户体验和开发新功能；
                    </view>
                    <view class="paragraph indent">
                        • 遵守法律法规的要求。
                    </view>
                </view>
            </view>

            <view class="privacy-section">
                <view class="section-title">信息共享与披露</view>
                <view class="section-content">
                    <view class="paragraph">
                        除以下情况外，未经您同意，我们不会与任何第三方共享您的个人信息：
                    </view>
                    <view class="paragraph indent">
                        • 根据法律法规的要求、强制性的行政或司法要求所必须提供的；
                    </view>
                    <view class="paragraph indent">
                        • 在法律允许的范围内，为保护我们及其用户的权利、财产或安全所必须提供的；
                    </view>
                    <view class="paragraph indent">
                        • 与我们的关联公司共享，但他们对获取的信息仅能按照本隐私政策所述目的使用；
                    </view>
                    <view class="paragraph indent">
                        • 与提供服务的供应商和合作伙伴共享，这些供应商和合作伙伴必须遵守我们的数据隐私要求；
                    </view>
                    <view class="paragraph indent">
                        • 经您明确同意的其他情况。
                    </view>
                </view>
            </view>

            <view class="privacy-section">
                <view class="section-title">信息安全</view>
                <view class="section-content">
                    <view class="paragraph">
                        我们非常重视您个人信息的安全，采取各种技术手段和管理措施来保护您的个人信息不被未经授权的访问、使用或泄露，包括但不限于：
                    </view>
                    <view class="paragraph indent">
                        • 使用加密技术保护数据的传输和存储；
                    </view>
                    <view class="paragraph indent">
                        • 严格限制访问个人信息的人员范围；
                    </view>
                    <view class="paragraph indent">
                        • 要求第三方服务提供商采取同等的信息保护措施；
                    </view>
                    <view class="paragraph indent">
                        • 定期审查和更新我们的信息安全措施。
                    </view>
                    <view class="paragraph">
                        尽管我们采取了上述措施，但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网环境下，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。
                    </view>
                </view>
            </view>

            <view class="privacy-section">
                <view class="section-title">您的权利</view>
                <view class="section-content">
                    <view class="paragraph">
                        根据适用的法律法规，您可能享有以下权利：
                    </view>
                    <view class="paragraph indent">
                        • 访问权：您有权访问我们持有的关于您的个人信息；
                    </view>
                    <view class="paragraph indent">
                        • 更正权：您有权要求我们更正不准确或不完整的个人信息；
                    </view>
                    <view class="paragraph indent">
                        • 删除权：在特定情况下，您有权要求我们删除您的个人信息；
                    </view>
                    <view class="paragraph indent">
                        • 限制处理权：在特定情况下，您有权限制我们对您个人信息的处理；
                    </view>
                    <view class="paragraph indent">
                        • 数据可携带权：您有权以结构化、常用和机器可读的格式接收您的个人信息，并有权将这些信息传输给另一个控制者；
                    </view>
                    <view class="paragraph indent">
                        • 反对权：在特定情况下，您有权反对我们处理您的个人信息；
                    </view>
                    <view class="paragraph indent">
                        • 撤回同意权：如果我们基于您的同意处理个人信息，您有权随时撤回您的同意。
                    </view>
                </view>
            </view>

            <view class="privacy-section">
                <view class="section-title">儿童隐私</view>
                <view class="section-content">
                    <view class="paragraph">
                        我们的服务不面向16岁以下的儿童。如果您是16岁以下的儿童，请在父母或监护人的指导下使用我们的服务。如果我们发现自己收集了16岁以下儿童的个人信息，且未获得可证实的父母同意，我们会尽快删除相关信息。
                    </view>
                </view>
            </view>

            <view class="privacy-section">
                <view class="section-title">隐私政策的更新</view>
                <view class="section-content">
                    <view class="paragraph">
                        我们可能会不时更新本隐私政策。当我们更新隐私政策时，我们会在应用程序中发布更新后的隐私政策，并更新"更新日期"。建议您定期查看本隐私政策，以了解我们如何保护您的信息。
                    </view>
                </view>
            </view>

            <view class="privacy-section">
                <view class="section-title">联系我们</view>
                <view class="section-content">
                    <view class="paragraph">
                        如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：
                    </view>
                    <view class="paragraph indent">
                        • 电子邮件：[您的邮箱地址]
                    </view>
                    <view class="paragraph indent">
                        • 电话：[您的联系电话]
                    </view>
                    <view class="paragraph">
                        我们会尽快回复您的请求。
                    </view>
                </view>
            </view>
        </scroll-view> -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            updateDate: '2023年12月1日'
        }
    },
    onLoad() {
        // 页面加载时的逻辑
        uni.setNavigationBarTitle({
            title: '隐私政策'
        });
    },
    methods: {
        // 可以添加页面相关的方法
    }
}
</script>

<style lang="scss">
.privacy-container {
    padding: 30rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #fff;
}

.privacy-title {
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20rpx;
}

.privacy-date {
    font-size: 26rpx;
    color: #666;
    text-align: center;
    margin-bottom: 30rpx;
}

.privacy-content {
    flex: 1;
    overflow: auto;
}

.privacy-section {
    margin-bottom: 40rpx;
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    color: #333;
}

.section-content {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
}

.paragraph {
    margin-bottom: 20rpx;
}

.indent {
    padding-left: 40rpx;
}

.bold {
    font-weight: bold;
}
</style>