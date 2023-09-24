<template>
	<view>
		<view v-for="(item,index) in emArray">
			<view v-if="item.is_solved === 1" @click="goToDetail(item.id,e)">
				{{ item.time +"历史紧急事件"}}
			</view>
		</view>
	</view>
	</view>
</template>

<script>
		//		"id":"string"
		//     "date": "string/long",
		//     "kind": "string",
		//     "farmCode": "string",
		//     "images": "string[]",
		//     "video": "string[]",
		//     "detail": "string",
		//     "result": "string",
		//     "done": int（done = 1, not done = 0）
	export default {
		onLoad() {
			console.log(this);
			this.getEmergencies();
		},
		data() {
			return {
				 emArray:[]
			}
		},
		methods: {

		getEmergencies() {
				const that = this;
				const result = uni.request({
					url: '',
					data: {
						arr: JSON.stringify([]),
					},
					success: (res) => {
						try {
							const data = JSON.parse(res.data.data);
							this.emArray = data;
						} catch (e) {
							this.emArray = data;
						}
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
.wuguEmergencies {
	border-style:solid;
	text-align: center;
	padding: 10%;
	margin: 10%;
}
.stealEmergencies {
	border-style:solid;
	text-align: center;
	padding: 10%;
	margin: 10%;
}
.shebeiEmergencies {
	border-style:solid;
	text-align: center;
	padding: 10%;
	margin: 10%;
}
</style>
