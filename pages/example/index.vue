<template>
	<view class="example-wrap">
		<u-navbar 
		:back-text-style="{color:'#fff'}" 
		:is-back="false" 
		title="例子" 
		title-color="#fff"
		back-icon-color="#fff"
		:background="{backgroundColor:'#fc5185'}"
		></u-navbar>
		
		<u-cell-group title="功能">
			<u-cell-item 
			@click="clickItemHandle('found')"
			title="基金信息" 
			>
			</u-cell-item>
			<u-cell-item
			@click="clickItemHandle('found')"
			title="基金信息" 
			>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods:{
			clickItemHandle(type){
				if(type==='found'){
					uni.navigateTo({
						url:'/pages/found/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.example-wrap {
	// background-color: #FFFFFF;
	}
</style>