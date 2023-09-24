<template>
	<view>
		<view v-for="(item,index) in emArray">
			<view v-if="item.is_solved === 0" @click="goToDetail(item.id,e)">
				{{ item.time +"最新紧急事件"}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log(this);
			this.getNewEmergencies();
		},
		data() {
			return {
				emArray:[]
			}
		},
		methods: {
			getNewEmergencies() {
				const that = this;
				const result = uni.request({
					url: '',
					data: {
					},
					success: (res) => {
					}
				});
			},
			goToDetail(id,e){
				uni.navigateTo({
					url: "details?id=" + id,
				});
			}
		}
	}
</script>

<style>

</style>
