<template>
	<view>
		<view class="Time">
		    当前时间:{{currentDate}} {{currentTime}}
		</view>
		<button @click="GetCurrentLocation" class="GetLo" plain="true">获取当前经纬度</button>
		<view class="Location" >
			当前经纬度：{{currentlatitude}}  {{currentlongitude}}
		</view>
		<button class="loginNo" @click="showActionSheet" v-model="selectNo" plain="true">
			请选择养殖场编号：{{ selectNo }}
		</button>
		<button class="Clock" @click="Clock" type="primary" v-model="Clock" style="display:block;margin:0 auto">
			打卡
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectNo:'未选择',
				currentTime:'',
				currentDate:'',
				Clockresult:'',
				currentlongitude:'',
				currentlatitude:'',
				Clongitude:0,
				Clatitude:0,
			};
		},
		mounted(){ //不断更新时间
			this.updateTime();
			setInterval(this.updateTime,1000);
		},
		methods: {
			updateTime(){//将时间格式化
				const now=new Date();
				const year = now.getFullYear();
				const month = this.padZero(now.getMonth() + 1);
				const day = this.padZero(now.getDate());
				const hour=this.padZero(now.getHours());
				const minute = this.padZero(now.getMinutes());
				const second = this.padZero(now.getSeconds());
				this.currentTime=`${hour}:${minute}:${second}`;
				this.currentDate=`${year}-${month}-${day}`;
			},
			padZero(value){
				return value<10?'0'+value:value;
			},
			showActionSheet(){//显示编号
				uni.showActionSheet({
					itemList:['1','2','3'],
					success:(res)=>{
						console.log(res.tapIndex);
						switch(res.tapIndex){
							case 0:
							this.selectNo='1';
							break;
							case 1:
							this.selectNo='2';
							break;
							case 2:
							this.selectNo='3';
							break;
						}
					},
					fail:(res)=>{
						console.log(res.errMsg);
					}
				})
			},
			Clock(){//显示打卡结果
				if(this.Clatitude===0){
					uni.showToast({
						title:'请获取当前经纬度',
						icon:'none',
						duration:1000,
					});
					return;
				}
				if(this.selectNo==='未选择'){
					uni.showToast({
						title:'请选择养殖场编号',
						icon:'none',
						duration:1000,
					});
					return;
				}
				this.Clockresult='成功';
				if(this.Clockresult.includes('成功')){
					uni.showToast({
						title:'打卡成功!',
						icon:'none',
						duration:1000,
					});
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/WorkOrder/WorkOrder",
						});
					},1000);
				}
			},
			GetCurrentLocation(){//获取当前位置
				let self=this;
				uni.getLocation({
					type:'wgs84',
					geocode:true,
					success:function(res){
						self.currentlatitude='经度'+res.latitude+'°'+'E';
						self.currentlongitude='纬度'+res.longitude+'°'+'N';
						self.Clatitude=res.latitude;
					},
					fail:function(){
						uni.showToast({
							title:'获取地址失败',
							icon:'none'
						})
					}
				})
			},
		},
}
</script>

<style lang="scss">
.Time{
	display: flex;
	flex-direction: row;
	font-size: 30rpx;
}
.Location{
	display: flex;
	font-size: 30rpx;
}
.Clock{
	width:50%;
	bottom:0;
	border-radius: 50rpx;
}
.GetLo{
	padding:10rpx 0;
	margin:20rpx 0;
	margin-left: 70rpx;
	margin-right: 70rpx;
	border-radius: 50rpx;
}
.loginNo{
	padding:10rpx 0;
	margin:20rpx 0;
	margin-left: 70rpx;
	margin-right: 70rpx;
	border-radius: 50rpx;
}
</style>
