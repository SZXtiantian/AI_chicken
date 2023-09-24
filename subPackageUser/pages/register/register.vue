<template>
    <view class="container">
        <view class="input-group">
            <text class="label">姓名:</text>
            <input v-model="name" class="input" type="text" placeholder="请输入姓名" />
        </view>

        <view class="input-group">
            <text class="label">注册身份:</text>
            <picker mode="selector" :range="idCodeOptionsText" @change="onIdCodeChange">
                <view class="picker">{{ selectedIdCode }}</view>
            </picker>
        </view>

        <view class="input-group">
            <text class="label">性别:</text>
            <picker mode="selector" :range="genderOptions" @change="onGenderChange">
                <view class="picker">{{ selectedGender }}</view>
            </picker>
        </view>

        <view class="input-group">
            <text class="label">手机号:</text>
            <input v-model="phone_number" class="input" type="number" placeholder="请输入手机号" />
        </view>

        <view class="input-group">
            <text class="label">邀请码:</text>
            <input v-model="invitation_code" class="input" type="text" placeholder="请输入邀请码" />
        </view>
		<view class="">
		
		</view>
        <button @click="submit" class="submit-btn">注册</button>
    </view>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            genderOptions: ['男', '女'],
            selectedGender: '请选择性别',
            idCodeOptionsText: ['买家', '员工', '业主'],
            selectedIdCode: '请选择身份',
            phone_number: '',
            invitation_code: '',
            login_state_string: uni.getStorageSync('lss') || '' // 假设您使用uni.setStorageSync存储了login_state_string
        };
    },
    methods: {
        onGenderChange(e) {
            this.selectedGender = this.genderOptions[e.detail.value];
        },
        onIdCodeChange(e) {
            this.selectedIdCode = this.idCodeOptionsText[e.detail.value];
        },
        submit() {
            const genderMapping = {'男': 0, '女': 1};
            const idCodeMapping = {'买家': 0, '员工': 4, '业主': 5};

            const genderValue = genderMapping[this.selectedGender];
            const idCodeValue = idCodeMapping[this.selectedIdCode];

            if (!this.name || !this.phone_number || !this.invitation_code || this.selectedGender === '请选择性别' || this.selectedIdCode === '请选择身份') {
                uni.showToast({
                    title: '请填写所有字段',
                    icon: 'none'
                });
                return;
            }
			uni.setStorageSync('name',this.name);
			uni.setStorageSync('id',this.selectedIdCode);
            // 发送请求到后端进行注册
            uni.request({
                url: 'https://api.mdpszu.ltd:8090/api/user/register',
                method: 'POST',
                data: {
                    idcode_to_register: idCodeValue,
                    login_state_string: this.login_state_string,
                    name: this.name,
                    gender: genderValue,
                    invitation_code: this.invitation_code,
                    phone_number: this.phone_number
                },
                success: (res) => {
					console.info(res.data);
                    if (res.statusCode === 200) {
                        uni.showToast({
                            title: '注册成功'
                        });
                    } else {
                        uni.showToast({
                            title: res.data.message || '注册失败',
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
			uni.switchTab({
			                 url: '/pages/user/user'
			                        });
        }
    }
};
</script>
<style>
.container {
    padding: 20rpx;
}

.input-group {
    margin-bottom: 20rpx;
}

.label {
    display: block;
    margin-bottom: 10rpx;
}

.input {
    width: 100%;
    padding: 10rpx;
    border: 1px solid #ccc;
    border-radius: 4rpx;
}

.picker {
    padding: 10rpx;
    border: 1px solid #ccc;
    border-radius: 4rpx;
}

.submit-btn {
    width: 100%;
    padding: 15rpx;
    background-color: #007aff;
    color: #fff;
    text-align: center;
    border-radius: 4rpx;
}
</style>
