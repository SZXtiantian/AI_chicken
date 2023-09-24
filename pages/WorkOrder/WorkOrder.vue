<template>
  <view class="container">
    <view class="button-container" @click="dailyInspection">
      <button class="btn">日常巡检</button>
      <image src="../../static/小鸡.png" class="button-image"></image>
    </view>
    <view class="button-container" @click="emergencyRegistration">
      <button class="btn">紧急事件登记</button>
      <image src="/static/小鸡.png" class="button-image"></image>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    dailyInspection() {
      // 在这里实现日常巡检的逻辑，可能需要调用API将巡检结果保存到服务器
	  uni.navigateTo({
	  	url:"/subPackageWorkOrder/pages/WorkOrder/DailyMove"
	  })
    },
    emergencyRegistration() {
      // 在这里实现紧急事件登记的逻辑，可能需要调用API将事件信息保存到服务器
	  uni.navigateTo({
	  	url:'/subPackageWorkOrder/pages/WorkOrder/EmergencyRegistration'
	  })
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20rpx;
  background: #f2f2f2;
}

.button-container {
  display: flex;
  align-items: center;
  width: 80%;
  margin-bottom: 30rpx;
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
.button-image {
  width: 40rpx;
  height: 40rpx;
  margin-left: 15rpx;
}
</style>
