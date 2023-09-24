
<script>
export default {
	onLaunch: function() {
		console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	},
    data() {
        return {
            identity: '游客' // 默认为游客，您可以从后端获取这个值
        };
    },
    onLaunch() {
        // 当应用启动时，获取用户身份
        this.wxLogin();
    },
    methods: {
		wxLogin() {
            uni.login({
                provider: 'weixin',
                success: loginRes => {
                    console.log(loginRes.code);
                    this.sendCodeToServer(loginRes.code);
                },
                fail: err => {
                    console.error("微信登录失败：", err);
                    uni.showToast({
                        title: '微信登录失败',
                        icon: 'none'
                    });
                }
            });
        },
        sendCodeToServer(code) {
            uni.request({
                url: 'https://api.mdpszu.ltd:8090/api/user/login',
                method: 'POST',
                data: {
                    code: code
                },
                header: {
                    'content-type': 'application/json'
                },
                success: res => {
                    // 解析返回的数据
                    //let loginState = res.data[0]; // 获取第一个字符作为登录态
                    //let remainingData = res.data.data.substring(1); // 获取剩下的字符串
					//let openid = res.data.data.substring(1,28);
                    //let [openid, sessionkey] = remainingData.split('-'); // 分割字符串以获取 openid 和 sessionkey
        
                    // 根据登录态处理后续流程
                    if (res.statusCode === 200) {
                        // 处理登录成功的情况，比如保存 openid 和 sessionkey
						uni.setStorageSync('lss',res.data.customstate);
						uni.setStorageSync('id',res.data.idcode);
						this.setTabBarForIdentity(id);//更改导航栏
                        //uni.setStorageSync('openid', openid);
                        //uni.setStorageSync('sessionkey', sessionkey);				
                        uni.switchTab({
                            url: '/pages/index/index'
                        });
						uni.showToast({
						    title: '登录成功',
						    icon: 'success'
						});
                    } else {
						console.error("Server responded with code:", res.statusCode);
                        uni.showToast({
                            title: '登录失败',
                            icon: 'none'
                        });
                    }
                },
                fail: err => {
                    console.error("请求后端失败：", err);
                    uni.showToast({
                        title: '服务器请求失败',
                        icon: 'none'
                    });
                }
            });
        }


    }
};
</script>

<!-- 样式部分... -->

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
