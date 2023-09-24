<template>
  <view class="container">
	<view class="header">
		<text class="title">签到页面</text>
    </view>
	<img src="@/static/kunkun.webp" style="width: 100%; height: auto;"/>
	
	<view class="Data">
	  <text>当前日期：         </text>
	  <text>{{ currentDate }}</text>
	</view>
   
    <view class="content">
      <input v-model="temperature" class="input-field" placeholder="温度" />
      <input v-model="humidity" class="input-field" placeholder="湿度" />
      <input v-model="co2" class="input-field" placeholder="二氧化碳浓度" />
      <button @click="signIn" :disabled="isSignInDisabled" class="signin-button">
        签到
      </button>
	  <button @click="findInformation" class="information-button">
	    查看签到信息
	  </button>
    
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		temperature: '',
		humidity: '',
		co2: '',
		signedEntries: [],
		currentDate: '', // 用于存储当前日期的数据

    };
  },
  computed: {
    isSignInDisabled() {
      return !(this.temperature && this.humidity && this.co2);
    },
  },
  methods: {
    signIn() {
      if (this.isSignInDisabled) {
        uni.showToast({
          title: '请填写完整的温度、湿度和二氧化碳浓度',
          icon: 'none',
        });
        return; 
      }
      
      const currentDate = new Date().toLocaleDateString();
      const existingEntryIndex = this.signedEntries.findIndex(
        entry => entry.date === currentDate
      );
      
      if (existingEntryIndex !== -1) {
        
        this.signedEntries[existingEntryIndex] = {
          date: currentDate,
          temperature: this.temperature,
          humidity: this.humidity,
          co2: this.co2,
        };
      } else {
        
        const entry = {
          date: currentDate,
          temperature: this.temperature,
          humidity: this.humidity,
          co2: this.co2,
        };
        this.signedEntries.push(entry);
      }
      
      this.saveToStorage();
      this.clearInputs();
      
      uni.showToast({
        title: '签到成功',
        icon: 'success',
        duration: 2000,
      });

      setTimeout(() => {
        uni.hideToast();
      }, 2000);
    },
	findInformation() {
		uni.navigateTo({
			url: '/pages/index/qiandao'
		})
	},
    saveToStorage() {
      uni.setStorageSync('signed_entries', this.signedEntries);
    },
    loadFromStorage() {
      const storedEntries = uni.getStorageSync('signed_entries');
      if (storedEntries) {
        this.signedEntries = storedEntries;
      }
    },
    clearInputs() {
      this.temperature = '';
      this.humidity = '';
      this.co2 = '';
    },


	onLoad: function () {
		this.getCurrentDate(); // 在页面加载时获取当前日期
	},
	getCurrentDate: function () {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1; // 月份从0开始，所以要加1
		const day = currentDate.getDate();

		const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
		this.currentDate= formattedDate;
	},
	  
  },
  created() {
    this.loadFromStorage();
	this.getCurrentDate();
  },
};
</script>

<style scoped>
.container {

}

.header {
	display: flex;
	justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.content {
  text-align: center;
}

.Data{
	text-align: center;
	background-color: aquamarine;
	padding-top: 20px;
	padding-bottom: 20px;
}
.input-field {
	margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 95%;
}

.information-button,
.signin-button{
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007aff;
  color: #fff;
  width:95%;
}

</style>
