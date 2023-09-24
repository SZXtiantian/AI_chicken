<template>
	<view class="pageDetail">
		<view class="title">
			事件类型
		</view>
		<view class="content">
			乌骨鸡异常事件
		</view>
		<view class="title">
			子养殖场编号
		</view>
		<view class="content">
			子场区①
		</view>
		<view class="title">
			事件描述
		</view>
		<view class="content">
			乌骨鸡走路一瘸一拐，食欲不振，无精打采
		</view>	
		<view class="title">
			处理过程
		</view>
		<view class="content">
			给受伤的乌骨鸡简单包扎后单独修养
		</view>
		<view class="title">
			描述图片
		</view>
		<view class="content">
			
		</view>	
		<view class="title">
			描述视频
		</view>
		<view class="content">
			
		</view>
		<view class="title">
			处理结果
		</view>
		<view class="content">
			已解决
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				emArray: []
			}
		},
		methods: {
			onLoad(option) {
				console.log(option.id)
			},
			getEmergencies() {
				const that = this;
				const result = uni.request({
					url: '',
					data: {
					},
					success: (res) => {
					}
				})
			},
		},
	}
	
</script>

<style>
	.title {
		font-size:14px;
		font-weight:bold;
		margin:10px 5px;
	}
	.content {
		text-align: center;
		border-style:solid;
		border-width:1px;
		margin:10px 5px;
		padding:10px 10px;
		width: 300px;
		        
	}
</style>