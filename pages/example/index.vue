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
		<view class="example-wrap">
			<u-search :disabled="true" placeholder="请输入基金编码或名称搜索" :show-action="false" @click="gotoSearch"></u-search>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods:{
			gotoSearch(){
				uni.navigateTo({url:'pages/example/search'})
			}
		}
	}
</script>

<style lang="scss" scoped>
.example-wrap {
	padding: 20rpx 30rpx ;
		.u-search{
		}
		.scroll-wrap{
			height: 300rpx;
			color: #303133;
			transition: .3;
		}
		.fund-item{
			padding: 10rpx 30rpx;
			border-bottom: 1px solid #F3F4F6;
		}
		.fund-item:hover{
			background-color: #F3F4F6;
		}
	}
</style>