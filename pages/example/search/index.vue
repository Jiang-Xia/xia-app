<template>
	<view class="u-content">
		<u-navbar 
		:back-text-style="{color:'#fff'}" 
		:is-back="true" 
		title="搜索" 
		title-color="#fff"
		back-icon-color="#fff"
		:background="{backgroundColor:'#fc5185'}"
		></u-navbar>
		<view class="example-wrap">
			<u-search :clearabled="true"  placeholder="请输入基金编码或名称搜索" @change="searchHandle"></u-search>
			<scroll-view class="scroll-wrap" :scroll-y="true" v-show="showFilter">
				<view @touchstart="clickItemHandle(item)" class="fund-item" v-for="(item,index) in filterList" :key="index">
					{{item[2]}}
				</view>
			</scroll-view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allFundList : [],
				filterList:[],
				showFilter:false
			}
		},
		onLoad() {
			this.getAllFound()
		},
		methods:{
			getAllFound(){
				this.$u.get('https://api.doctorxiong.club/v1/fund/all').then(res=>{
					this.allFundList=res.data
				})
			},
			gotoSearch(){
				
			},
			// 联想基金名称
			searchHandle(val){
				this.filterList = this.allFundList.filter(v=>{
					return v[0].indexOf(val)>=0||v[2].indexOf(val)>=0
				})
				this.filterList.length>50?this.filterList.length=50:''
				this.showFilter = true
			},
			// 点击item
			clickItemHandle(item){
				this.showFilter = false
				console.log(item)
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