<template>
  <view class="container">
    <button class="custom-btn" @click="showFarmManagement">养殖场信息管理</button>
    <button class="custom-btn" @click="showEquipmentManagement">设备信息管理</button>
    <button class="custom-btn" @click="showInOutCount">出入栏统计</button>
    <button class="custom-btn" @click="showFeedUsage">饲料使用</button>
  </view>
</template>

<script>
export default {
  methods: {
    showFarmManagement() {
      // Navigate to farm information management page
      uni.navigateTo({
        url: '/subPackageBreedData/spages/FarmManagement/FarmManagement'
      });
    },
    showEquipmentManagement() {
      // Navigate to equipment information management page
      uni.navigateTo({
        url: '/subPackageBreedData/pages/EquipmentManagement/EquipmentManagement'
      });
    },
    showInOutCount() {
      // Navigate to In-Out statistics page
      uni.navigateTo({
        url: '/subPackageBreedData/pages/InOutCount/InOutCount'
      });
    },
    showFeedUsage() {
      // Navigate to feed usage page
      uni.navigateTo({
        url: '/subPackageBreedData/pages/BreedData/FeedUsage'
      });
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
  padding: 10px;
  background-color: #f6f6f6;
}

.custom-btn {
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

.custom-btn:active {
  transform: scale(0.95);
}
</style>
