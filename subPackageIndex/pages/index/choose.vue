<template>
  <view class="container">
    <view class="info-section">
      <text class="header">智慧养鸡</text>
      <view class="info-item">
        <text class="label">当前鸡数量:</text>
        <text class="value">{{ chickenCount }}</text>
      </view>
      <view class="info-item">
        <text class="label">健康状况:</text>
        <text class="value">良好</text>
      </view>
      <!-- 更多信息 ... -->
    </view>

    <view class="video-section">
      <video src="http://v16m-default.akamaized.net/d61d74fc6988ad08b3f624569ed63e47/64eba1b1/video/tos/alisg/tos-alisg-ve-0051c001-sg/owTB89kyhnNADr2De0AVWQInmgPQsnrBWibf8J/?a=2011&amp;ch=0&amp;cr=0&amp;dr=0&amp;net=5&amp;cd=0%7C0%7C0%7C0&amp;br=2580&amp;bt=1290&amp;cs=0&amp;ds=3&amp;ft=iJOG.y7oZZv0PD1tZz4Xg9wz.DKlBEeC~&amp;mime_type=video_mp4&amp;qs=0&amp;rc=fG9iaGwxZmRobDFkd3JAKWRmZmc0aDU7OTdoaTxoaDdnKThlZXd4OnV4c2YzM2o2M3l5Xm1sYXNlb2xhc2xmcnFgNjIwMjYvYGMzNTFjXjBfMTpjZC1tajE0YG5oZi0tMjAtLjo%3D&amp;l=20230827131447F04AFA34DF696B4795AE&amp;btag=e00098000" controls autoplay loop class="video"></video>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      chickenCount: 1000
      // 其他数据...
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(45deg, #f3f4f6, #e9eaec);
  height: 100vh;
}

.header {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #34495e;
  margin-bottom: 20px;
}

.info-section {
  padding: 25px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.label {
  font-size: 18px;
  color: #2c3e50;
}

.value {
  font-size: 18px;
  color: #27ae60;
  font-weight: 500;
}

.video-section {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.video {
  width: 100%;
  max-width: 480px;  /* 控制视频的最大宽度 */
  border-radius: 10px;
}
</style>
