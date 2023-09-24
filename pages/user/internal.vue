<template>
    <view class="container">
        <text class="id">ID: {{ userId }}</text>
        <text class="identity">身份: {{ identity }}</text>
        <button v-if="identity === '业主'" @click="viewEmployeeInfo" class="info-btn">查看员工信息</button>
        <button v-if="identity !== '买家'" @click="switchToBuyer" class="switch-btn">切换为买家</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
			login_state_string: uni.getStorageSync('lss') || '',
            userId: uni.getStorageSync('name'),  // 从后端或微信API获得
            //avatarUrl: 'YOUR_WECHAT_AVATAR_URL',  // 从后端或微信API获得
            identity: uni.getStorageSync('id')  // 从后端获得，可以是 '员工' 或 '业主'
        };
    },
    methods: {
        viewEmployeeInfo() {
            // 显示员工信息，例如弹出窗口或导航到员工信息页面
        },
        switchToBuyer() {
            // 与后端通信切换身份为买家
            uni.request({
                url: '192.168.1.25:10012/api/user/changeid', // 替换为与后端通信的API地址
                method: 'POST',
                data: {
                    userId: this.userId
                },
                success: (res) => {
                    if (res.data.success) {
                        uni.showToast({
                            title: '切换为买家成功'
                        });
                        // 更新用户信息
                        this.identity = '买家';
                    } else {
                        uni.showToast({
                            title: res.data.message || '切换身份失败',
                            icon: 'none'
                        });
                    }
                },
                fail: () => {
                    uni.showToast({
                        title: '网络错误',
                        icon: 'none'
                    });
                }
            });
        }
    }
};
</script>

<!-- 样式部分... -->
