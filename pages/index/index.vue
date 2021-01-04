<template>
	<view>
		<u-navbar 
		:is-back="false" 
		title="首页"
		title-color="#fff"
		back-icon-color="#fff"
		:back-text-style="{color:'#fff'}" 
		:background="{backgroundColor:'#fc5185'}">
		</u-navbar>
		<!-- <image class="logo" src="/static/logo.png"></image> -->
<!-- 		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<view class="wrap">
				<u-swiper :list="list"></u-swiper>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello xia',
				background: {
					// backgroundColor: '#001f3f',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				list: [{
								image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
								title: '昨夜星辰昨夜风，画楼西畔桂堂东'
							},
							{
								image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
								title: '身无彩凤双飞翼，心有灵犀一点通'
							},
							{
								image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
								title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
							}
						],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.wrap {
			padding: 40rpx;
		}
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
