<template>
  <view>
    <view class="pa">
      <image src="../../static/ji.png" mode="aspectFill"class="chi"></image>
    </view>
    <view class="buttonContainer">
      <button class="btn" @click="showFarms">选择养殖场</button>
      <button class="btn" @click="showFarmInfo">查看养殖场信息</button>
      <button class="btn" @click="showSubFarms" v-if="userRole === 'owner'">管理子养殖场</button>
      <button class="btn" @click="showEmergencies">查看紧急事件</button>
      <button class="btn" @click="showInspectionTasks">查看巡检任务信息</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userRole: uni.getStorageSync('selectedRole'), // 获取登录用户的角色
    };
  },
  methods: {

    showFarms() {
      // 在这里实现养殖场选择的逻辑，可能需要调用API获取养殖场列表
	  uni.navigateTo({
	  	url:'/subPackageIndex/pages/index/choose'
	  })
    },
    showFarmInfo() {
      // 在这里实现养殖场对外介绍的逻辑，可能需要调用API获取养殖场信息
	  uni.navigateTo({
	  	url:'/subPackageIndex/pages/index/intro'
	  })
    },
    showSubFarms() {
      // 在这里实现子养殖场展示管理的逻辑，可能需要调用API获取子养殖场的信息
      // 注意：只有业主可以管理子养殖场，所以这个方法只对业主角色可用
    },
    showEmergencies() {
      // 在这里实现紧急事件查看的逻辑，可能需要调用API获取事件信息
	  uni.navigateTo({
	  	url:'/subPackageIndex/pages/index/showEmergencies'
	  })
	  	
    },
    showInspectionTasks() {
      // 在这里实现巡检任务信息查看的逻辑，可能需要调用API获取任务信息
	  uni.navigateTo({
	  	url:'/subPackageIndex/pages/index/viewdata'
	  })
    }
  }
};
</script>

<style scoped>
.pa {
	
  display: flex;
  justify-content: center;
  margin: 40rpx 20rpx;
  border-radius: 8px;
}

.chi {
	margin-top: 100rpx;
  width: 85%;
  border-radius: 10rpx;
  height: 300rpx;
}


.buttonContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30rpx;
}

.btn {
  width: 80%;
  padding: 10px 0;
  margin: 8px 0;
  border: none;
  border-radius: 25px;
  color: #fff;
  font-size: 16px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  background: linear-gradient(135deg, #FF9D6A, #FF6A88);
}

.btn:active {
  transform: scale(0.95);
}
</style>
