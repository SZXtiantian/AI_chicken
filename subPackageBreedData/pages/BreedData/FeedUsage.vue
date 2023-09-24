
<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前日期：
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" name="当前日期" @change="bindDateChange">
							<view class="uni-input2">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前时间:
					</view>
					<view class="uni-list-cell-db">
						<picker mode="time" :value="time" start="00:00" end="24:00" name="当前时间"  @change="bindTimeChange">
							<view class="uni-input">{{time}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						所属养殖场编号:
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input">
							<textarea auto-height="" placeholder="请填写" name="所属养殖场编号"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						所属出入栏编号:
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input">
							<textarea auto-height="" placeholder="请填写" name="所属出入栏编号"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-title uni-common-pl">饲料使用量(kg):</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						{{items[0].name}}:
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input3">
							<textarea  auto-height="" placeholder="0" name="饲料1使用量"/>
						</view>
					</view>
				</view>
			</view>
				
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						{{items[1].name}}:
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input3">
							<textarea  auto-height="" placeholder="0" name="饲料2使用量"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						{{items[2].name}}:
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input3">
							<textarea  auto-height="" placeholder="0" name="饲料3使用量"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						{{items[3].name}}:
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input3">
							<textarea  auto-height="" placeholder="0" name="饲料4使用量"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						{{items[4].name}}:
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input3">
							<textarea  auto-height="" placeholder="0" name="饲料5使用量"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						{{items[5].name}}:
					</view>
					<view class="uni-list-cell-db">
						<view class="uni-input3">
							<textarea  auto-height="" placeholder="0" name="饲料6使用量"/>
						</view>
					</view>
				</view>
			</view>
			
			<view class="uni-btn-v">
				<button type="primary" form-type="submit">提交</button>
				<button type="default" form-type="reset" ref="resrtBtn" plain="true">清空</button>
			</view>
		</form>
		
	</view>
</template>

<script>
	export default {
		 
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			const currentTime= this.getTime({
						format:true
			})
			return {
			date:currentDate,
			time:currentTime,
			items: [{
						value: '饲料1',
						name: '饲料1',
						chosen:'false',
					},
					{
						value: '饲料2',
						name: '饲料2',
						chosen:'false',
					},
					{
						value: '饲料3',
						name: '饲料3',
						chosen:'false',
					},
					{
						value: '饲料4',
						name: '饲料4',
						chosen:'false',
					},
					{
						value: '饲料5',
						name: '饲料5',
						chosen:'false',
					},
					{
						value: '饲料6',
						name: '饲料6',
						chosen:'false',
					}
				]
			};
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		methods:{
			formSubmit: function(e) {
							console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
							var formdata = e.detail.value
							uni.showModal({
								// content: '表单数据内容：' + JSON.stringify(formdata),
								content:'提交成功',
								showCancel: false
							});
							this.$refs.resrtBtn.$dispatch('Form','uni-form-reset',{
								type:'reset'
							})
						},
			formReset: function(e) {
				console.log('清空数据')
			},
			getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			},
			getTime(type){
						const date=new Date();
						let hours=date.getHours();
						let minutes=date.getMinutes();
						hours=hours>9?hours:'0'+hours;
						minutes=minutes>9?minutes:'0'+minutes;
						return `${hours}:${minutes}`
			},
			 bindDateChange: function(e) {
			            this.date = e.detail.value
			        },
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
.uni-list-cell {
	justify-content: flex-start
}
.uni-btn-v{
	padding:10rpx 0;
}
.uni-btn-v button{
	margin:20rpx 0;
	margin-left: 70rpx;
	margin-right: 70rpx;
	border-radius: 50rpx;
}

.uni-list {
	background-color: #FFFFFF;
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
}
.uni-list-cell {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.uni-list-cell-left {
    white-space: nowrap;
	font-size:35rpx;
	padding: 0 30rpx;
}
.uni-input {
	height: 50rpx;
	padding: 15rpx 25rpx;
	line-height:50rpx;
	font-size:35rpx;
	background:#FFF;
	flex: 1;
}
.uni-input2 {
	height: 50rpx;
	padding: 15rpx 3rpx;
	line-height:50rpx;
	font-size:35rpx;
	background:#FFF;
	flex: 1;
}
.uni-input3 {
	height: 40rpx;
	padding: 15rpx 0;
	line-height:50rpx;
	font-size:35rpx;
	background:#FFF;
	flex: 1;
}
.uni-list-cell-db,
.uni-list-cell-right {
	flex: 1;
}
.uni-title {
	font-size:40rpx;
	font-weight:500;
	padding:20rpx 0;
	line-height:1.5;
}
.uni-common-pl{
	padding-left:30rpx;
}
</style>
