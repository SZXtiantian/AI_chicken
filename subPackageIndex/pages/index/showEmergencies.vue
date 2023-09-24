<template>
	<view>
		<button class="newEmergencies" @tap="goToNew">紧急事件</button>
		<button class="histories" @tap="goToHistory">历史事件</button>
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goToNew(){
				uni.navigateTo({
					url:'showNewEmergencies'
				});
			},
			goToHistory(){
				uni.navigateTo({
					url:'showEmergenciesHistory'
				})
			}
		}
	}
</script>

<style>
.newEmergencies {
	width: 80%;
	text-align: center;
	padding: 10%;
	margin: 10%;
	
}

.histories {
	width: 80%;
	text-align: center;
	padding: 10%;
	margin: 10%;
}
</style>
