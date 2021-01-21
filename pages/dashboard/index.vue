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
		<view class="index-wrap">
			<view class="border-wrap">
			</view>
			<u-search :clearabled="true" disabled :show-action="false"></u-search>
			<u-swiper :list="list"></u-swiper>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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

<style lang="scss">
	.index-wrap {
		padding: 10rpx 30rpx ;
			.border-wrap{
				background-color:#fc5185 ;
				border-radius: 0 0 20px 20px;
				height: 300rpx;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				z-index: -1;
			}
			.u-swiper-wrap{
				margin-top: 28rpx;
			}
			.u-search{
			}
		}
</style>
