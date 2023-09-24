<template>
  <view class="container">
	  
    <view class="header">
      <text class="title">签到记录</text>
	 
    </view>
	 <img src="@/static/kunkun2.webp" alt="图片描述" style="width: 100%; height: auto;"/>
	<button @click="clearEntries" class="clear-button">
	  清空签到记录
	</button>
    <view class="content">
      <table class="signed-table">
        <thead>
          <tr class="signed-name">
            <th>序号</th>
            <th>签到日期</th>
            <th>温度</th>
            <th>湿度</th>
            <th>二氧化碳浓度</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in signedEntries" :key="entry.date">
            <td>{{ index + 1 }}</td>
            <td>{{ entry.date }}</td>
            <td>{{ entry.temperature }}</td>
            <td>{{ entry.humidity }}</td>
            <td>{{ entry.co2 }}</td>
          </tr>
        </tbody>
      </table>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      signedEntries: [],
    };
  },
  created() {
    this.loadSignedEntries();
  },
  methods: {
    loadSignedEntries() {
      const storedEntries = uni.getStorageSync('signed_entries');
      if (storedEntries) {
        this.signedEntries = storedEntries;
      }
    },
	clearEntries() {
	  this.signedEntries = [];
	  uni.removeStorageSync('signed_entries'); // 清除本地存储中的签到记录数据
	  uni.showToast({
	    title: '清除成功',
	    icon: 'success',
	    duration: 2000,
	  });
	},
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.header {
	display: flex;
	justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.content {
  text-align: center;
}

.signed-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;font-size: 11px;
}

.signed-table th,
.signed-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.signed-table th {
	
	
  background-color: #f2f2f2;
  text-align: left;
}
.clear-button {
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007aff;
  color: #fff;
}
</style>

