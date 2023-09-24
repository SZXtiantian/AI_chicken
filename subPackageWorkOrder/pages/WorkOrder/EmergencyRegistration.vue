<template>
	<view class="mainCSS">
		<view class="column">1. 发生时间</view>
		<uni-datetime-picker type="date" :end="endDate" @change="bindDateChange"></uni-datetime-picker>

		<view class="column">2. 事件类型</view>
		<uni-data-select placeholder="请选择事件类型" :localdata="kind" :value="kindValue"
			@change="bindKindChange"></uni-data-select>

		<view class="column">3. 子养殖场编号</view>
		<uni-easyinput placeholder="二号区③" @input="bindFarmCode"></uni-easyinput>

		<view class="column">4. 事件描述</view>
		<uni-easyinput type="textarea" autoHeight placeholder="请描述紧急事件的具体情况" @input="bindTextDetail"></uni-easyinput>

		<view class="column">5. 上传图片</view>
		<uni-file-picker title="最多选择九张图片" ref="files" @select="bindSelect" @delete="bindDelete"></uni-file-picker>

		<view class="column">6. 上传视频</view>
		<uni-file-picker file-mediatype="video" @select="bindVideoSelect" @delete="bindVideoDelete"
			limit="1"></uni-file-picker>

		<view class="column">7. 处理结果</view>
		<uni-easyinput type="textarea" autoHeight placeholder="请描述事件是如何处理的" @input="bindResult"></uni-easyinput>

		<view class="column">8. 是否已经解决了</view>
		<uni-data-checkbox :value="doneValue" :localdata="done" @change="bindDoneChange"></uni-data-checkbox>

		<button class="column" type="primary" @click="submit">提交</button>
	</view>
</template>
/*
{
	data: {
		time: number;
		type: number;
		sub_yard_id: string;
		desc: string;
		imgs: string[];
		video_src: string;
		result: string;
		is_solved: string;
	}
	status_code: number;
}
*/
<script>
	export default {
		data() {
			return {
				date: '',
				kindValue: 0,
				kind: [{
						value: 0,
						text: '养殖物异常'
					},
					{
						value: 1,
						text: '设备异常'
					},
					{
						value: 2,
						text: '偷盗'
					},
					{
						value: 3,
						text: '野生动物'
					},
					{
						value: 4,
						text: '灾害'
					},
					{
						value: 5,
						text: '其他异常'
					}
				],
				farmCode: "未填写",
				detail: '未填写',
				images: '',
				imagesPaths: [],
				video: '',
				videoPath: '',
				result: "未填写",
				doneValue: 0,
				done: [{
					text: '未解决',
					value: 0
				}, {
					text: '已解决',
					value: 1
				}]
			}
		},
		computed: {
			endDate() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e;
			},
			bindKindChange: function(e) {
				this.kindValue = e;
			},
			bindFarmCode: function(e) {
				this.farmCode = e;
			},
			bindTextDetail: function(e) {
				this.detail = e;
			},
			bindResult: function(e) {
				this.result = e;
			},
			bindDoneChange: function(e) {
				this.doneValue = e.detail.value;
			},
			submit() {
				if (this.imagesPaths.length != 0) {
					var uploadTask = uni.uploadFile({
						url: 'http://192.168.6.128:8080', // 上传图片的接口地址
						files: this.imagesPaths,
						success: (response) => {
							this.images = response.data;
						},
						fail: (response) => {
							console.log(response)
						}
					})
					uploadTask.onProgressUpdate((response) => {
						// console.log(response.progress)
					})
				}
				if (this.videoPath != '') {
					var uploadTask = uni.uploadFile({
						url: 'http://192.168.6.128:8080', // 上传视频的接口地址
						filePath: this.videoPath,
						name: 'file',
						success: (response) => {
							this.video = response.data;
						},
						fail: (response) => {
							console.log(response)
						}
					})
					uploadTask.onProgressUpdate((response) => {
						// console.log(response.progress)
					})
				}
				this.sendRequstToServer();
			},
			bindSelect(e) {
				for (let file of e.tempFiles) {
					this.imagesPaths.push({
						uri: file.path
					})
				}
			},
			bindDelete(e) {
				this.imagesPaths.splice(this.imagesPaths.indexOf({
					uri: e.tempFilePath
				}), 1)
			},
			bindVideoSelect(e) {
				this.videoPath = e.tempFilePaths[0] // 限制一个视频
			},
			bindVideoDelete(e) {
				this.videoPath = ''
			},
			sendRequstToServer() {
				uni.request({
					url: 'http://192.168.6.128:8080', // 紧急事件登记的接口地址
					method: 'POST',
					data: {
						date: this.date,
						kind: this.kind[this.kindValue].text,
						farmCode: this.farmCode,
						detail: this.detail,
						images: this.images,
						video: this.video,
						result: this.result,
						done: this.doneValue==1
					},
					header: {
						'content-type': 'application/json' // 自定义请求头信息
					},
					success: (response) => {
						if (response.statusCode == 200) {
							uni.showToast({
								title: '提交成功'
							});
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/WorkOrder/WorkOrder',
								})
							}, 2000)
						} else {
							console.log('提交失败：', response);
							uni.showToast({
								title: '提交失败',
								icon: 'error'
							})
						}
					},
					fail: (response) => {
						console.log('请求后端失败：', response);
						uni.showToast({
							title: '提交失败',
							icon: 'error'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.mainCSS {
		padding: 25rpx;
		background-color: white;
	}

	.column {
		margin-top: 30rpx;
		margin-bottom: 15rpx;
		font-weight: bold;
		font-size: 30rpx;
	}

	button {
		border-radius: 30rpx;
	}
</style>