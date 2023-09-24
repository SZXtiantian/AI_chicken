<template>
  <view class="container">
    <view class="header">赤水乌骨鸡</view>
    <swiper class="swiper" autoplay="true" interval="3000" duration="1000" indicator-dots="true">
      <swiper-item v-for="(img, index) in images" :key="index">
        <image :src="img" class="slide-image" mode="aspectFill" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      images: [
        '/static/图片1.jpg',
		
		'/static/图片8.jpg',

      ]
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f3f4f6;
  height: 100vh;
}

.header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
}

.swiper {
  height: 450rpx;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
}
</style>
