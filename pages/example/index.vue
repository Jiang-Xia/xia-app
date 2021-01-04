<template>
	<view class="u-content">
		<u-navbar 
		:back-text-style="{color:'#fff'}" 
		:is-back="false" 
		title="例子" 
		title-color="#fff"
		back-icon-color="#fff"
		:background="{backgroundColor:'#fc5185'}"
		></u-navbar>
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `
					<p>露从今夜白，月是故乡明</p>
					<p style='color:red; font-size:20px;'><b>仅可以使用复姓！！</b></p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`
			}
		},
	}
</script>

<style lang="scss" scoped>
	.u-content {
		margin-top: 100rpx;
	}
</style>