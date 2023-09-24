export default {
	data() {
		return {
			// 默认的全局分享内容（待测试）
			share: {
				title: '好鸡会来啦',
				path: '/pages/index/index', // 全局分享的路径
				imageUrl: 'https://pic.imgdb.cn/item/64e3841c661c6c8e5426383b.jpg', // 全局分享的图片(可本地可网络)
			}
		}
	},
	// 定义全局分享
	// 1.发送给朋友
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
		}
	},
	//2.分享到朋友圈
	onShareTimeline(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
		}
	},
}