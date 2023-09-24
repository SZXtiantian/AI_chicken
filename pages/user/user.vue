<template>
<div class="container">	
	<div class="section">
		
		<!-- 第一部分 -->
		<div class="section_2 space-y-13">
			  
			<!-- ->更多 -->
			<div class="image-container">
				<img
				  class="image_more"
				  src="../../static/user_pic_more.png"
				/>	
			</div>
		
			<!-- 头像 -->
			<div class="items-center space-y-18">
			  <img
			    class="head_pic"
			    src="../../static/logo.png"
			  />     
			</div>
			
			<!-- 用户名 -->
			<div class="text-container">
				<p>kunkun</p>
			</div>
			
	
		</div> 
		
		
		<!-- 第二部分 身份显示-->
		<div class="identity" v-model="selectedRole">
			<p>{{ selectedRole }}</p>
		</div>
		
	
		<!-- 第三部分 -->
		<div class="flex-col relative list">
			<div class="flex-row justify-between list-item" v-for="(item,index) in items" :key="index">
				
				
				<!-- 切换身份 -->
				<div class="flex-row space-x-18" v-if="item.list_name == '切换身份'" @click="showActionSheet">
					<img
						class="shrink-0 image_4 "
						src="../../static/user_change.png"
					/>
					
					<span class="font_2" >{{item.list_name}}</span>
					<div class="pic_right">
						<img
							class="image"
							src="../../static/user_right.png"
						/>
					</div>				
				</div>
					
				
				<!-- 个人信息 -->	
				<div class="flex-row space-x-18" v-if="item.list_name == '个人信息'">
					<img
						class="shrink-0 image_4 "
						src="../../static/user_identity.png"
					/>
					
					<span class="font_2" >{{item.list_name}}</span>
					<div class="pic_right">
						<img
							class="image"
							src="../../static/user_right.png"
						/>
					</div>				
				</div>
				
				
				<!-- 问题反馈 -->
				<div class="flex-row space-x-18" v-if="item.list_name == '问题反馈'">
					<img
						class="shrink-0 image_4 "
						src="../../static/user_question.png"
					/>
					
					<span class="font_2" >{{item.list_name}}</span>
					<div class="pic_right">
						<img
							class="image"
							src="../../static/user_right.png"
						/>
					</div>				
				</div>
				
				
				<!-- 高级 -->	
				<div class="flex-row space-x-18" v-if="item.list_name == '高级'">
					<img
						class="shrink-0 image_4 "
						src="../../static/user_setting.png"
					/>
					
					<span class="font_2" >{{item.list_name}}</span>
					<div class="pic_right">
						<img
							class="image"
							src="../../static/user_right.png"
						/>
					</div>				
				</div>
				
				
				<!-- 关于 -->
				<div class="flex-row space-x-18" v-if="item.list_name == '关于'">
					<img
						class="shrink-0 image_4 "
						src="../../static/user_about.png"
					/>
					
					<span class="font_2" >{{item.list_name}}</span>
					<div class="pic_right">
						<img
							class="image"
							src="../../static/user_right.png"
						/>
					</div>				
				</div>
				
				
			</div>
			
			
			<!-- 注册按钮 -->
			<button class='btn register-btn' @click="direct">注册</button>
		</div>
		
	</div>
	
	<!-- 悬浮按钮 -->
	<movable-area class="float-button-container" >
	  <movable-view class="float-button" direction="all" :inertia="true" :x="x" :y="y" damping="2" friction="1" @click="showActionSheet">
	    <view class="float-button-icon">+</view>
	  </movable-view>
	</movable-area>
</div>




</template>

<script>
export default {
  components: {},
  props: {},
  data() {

    return {
		items: [
			  {list_name: "切换身份", list_pic:""},
			  {list_name:"个人信息",list_pic:""}, 
			  {list_name:"问题反馈",list_pic:""}, 
			  {list_name:"高级",list_pic:""},
			  {list_name:"关于",list_pic:""}
			  ],
		userId: uni.getStorageSync('name'),
		identityCode: uni.getStorageSync('id'),
		selectedRole: '游客',
		x:301,
		y:280,
    };
  },
	computed: {
        identity() {
            switch (this.identityCode) {
                case '1': return '买家';
                case '5': return '业主';
                case '4': return '员工';
                default: return '游客';
            }
        }
    },
  methods: {
	  
	direct() {
	        uni.navigateTo({
	        url: '/subPackageUser/pages/register/register'
		});
	},
	
    switchIdentity(targetId) {
        uni.request({
            url: 'https://api.mdpszu.ltd:8090/api/user/changeid',
            method: 'POST',
            data: {
                login_state_string: uni.getStorageSync('lss'),
                idToSwitch: targetId
            },
            success: res => {					
				this.setTabBarForIdentity(idToSwitch);//更改导航栏
                if (res.statusCode === 200) {
					uni.setStorageSync('lss', res.data.response);
					uni.setStorageSync('id', res.data.response[0]);
                    uni.showToast({
                        title: `切换为${this.identity}成功`
                    });
                    this.identityCode = res.data.newIdentity;
					this.selectedRole = this.identity
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
    },	
	


    showActionSheet() {
  		uni.showActionSheet({
  		  itemList: ['业主', '员工', '买家', '游客'],
  		  success: (res) => {
  			console.log(res.tapIndex);
  			switch (res.tapIndex) {
  			  case 0:
  				//this.selectedRole = '业主';
				// this.identityCode = 5;
				this.switchIdentity(5);
  				break;
  			  case 1:
  				//this.selectedRole = '员工';
				//this.identityCode = 4;
				this.switchIdentity(4);
  				break;
  			  case 2:
  				//this.selectedRole = '买家';
				//this.identityCode = 1;
				this.switchIdentity(1);
  				break;
			  case 3:
			    this.selectedRole = '游客';
			  	//this.identityCode = 0;
			    break;
  			}
  		  },
  		  fail: (res) => {
  			console.log(res.errMsg);
  		  }
  		}
  		);
    }
},
}
</script>


<style scoped lang="css">
.section {

	background-color: #025ab4;
}
.float-button-container {
	
	pointer-events:none;// 这个属性设置为none,让所有事件穿透过去
    z-index: 100;
    width: 370px;
    height:550px;
    position: fixed;

}

.float-button {
  position: fixed;
  width: 35px;
  height: 35px;
  background-color: gray;
  border-radius: 20%;
  pointer-events:auto;
  top: 50px;
  left: 0px;
  right: 0px;
  bottom: 10px;
}

.float-button-icon {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 30px;
  color: white;
  margin-top: 4px;
}


.section_2 {
	padding: 21px 23px 72px 28px;
	background-image: url('../../static/user_background.png');
	background-size: 100% 100%;
}

.space-y-13 > *:not(:first-child) {
  margin-top: 13px;
}

.image-container {
	text-align: right;
}

.text-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

p {
    font-size: 18px;
    font-family: Roboto;
    color: #ffffff;
}

.image_more {
	width: 20px;
	height: 20px;
}


.space-y-18 {
    display: flex;
    justify-content: center;
    align-items: center;
}
.head_pic {
	border-radius: 50%;
	width: 100px;
	height: 100px;
}

.text {
  line-height: 10.5px;
}


.identity{
	margin-top: -70px;
	padding-bottom: 36px;
	text-align: center;
}






.pic_right{
	margin-top: -24px;
	text-align: right;
}



.image {
  width: 18px;
  height: 18px;

}
.list {
  margin-top: -3px;
  padding-bottom: 16px;
  background-color: #ffffff;
  border-radius: 30px 30px 0 0;
  box-shadow: 0px 2px 4px #ffffff;
}
.list-item {
  padding: 22px 24px 22px 24px;
  background-color: #ffffff;
  border-radius: 20px 20px 0px 0px;
}
.space-x-18 > *:not(:first-child) {
  margin-left: 18px;
}


.image_4 {
  width: 18px;
  height: 16px;
  
}
.font_2 {
  font-size: 16px;

  line-height:1.2;
  color: #000000b3;
}



.btn {
    width: 60%;
    height: 35px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 25px;
    text-align: center;
    margin: 10px center;
    transition: transform 0.3s;
}

.register-btn {
    background-color: #FF6A88;
    color: #fff;
}
</style>