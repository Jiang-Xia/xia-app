<template>
	<view class="search-content">
		<u-navbar 
		:back-text-style="{color:'#fff'}" 
		:is-back="true" 
		title="搜索基金" 
		title-color="#fff"
		:custom-back="customBack"
		back-icon-color="#fff"
		:background="{backgroundColor:'#fc5185'}"
		></u-navbar>
		<view class="example-wrap">
			<u-search :clearabled="true"  
			placeholder="请输入基金编码或名称搜索" 
			@change="changeHandle"
			@search="searchHandle"
			></u-search>
			<scroll-view class="scroll-wrap" :scroll-y="true" v-show="showFilter">
				<view @touchend="clickItemHandle(item)" class="fund-item" v-for="(item,index) in filterList" :key="index">
					{{item.NAME}}
				</view>
			</scroll-view>
			
				<u-card :title="foundDetail.SHORTNAME" :sub-title="foundDetail.FCODE" v-if="Object.keys(foundDetail).length" >
					<view class="" slot="body">
						<u-button 
						style="margin-bottom:20rpx"
						size="mini" 
						type="primary" 
						:ripple="true"
						ripple-bg-color="#19be6b"
						plain
						:hair-line="true"
						@click="addMyChoice(foundDetail)"
						 >加自选</u-button>
						<view>
							<view> {{foundDetail.PDATE}} 净值：</view>
							<u-tag 
							:text="''+foundDetail.NAV+'   '+foundDetail.NAVCHGRT+' %'" 
							shape="circleRight"
							:type="foundDetail.NAVCHGRT.indexOf('-')!==-1?'success':'error'" 
							/>
						</view>
						
						<view>
							<view> {{foundDetail.GZTIME}} 估值：</view>
							<u-tag 
							:text="''+foundDetail.GSZ+'   '+foundDetail.GSZZL+' %'" 
							shape="circleRight"
							:type="foundDetail.GSZZL.indexOf('-')!==-1?'success':'error'" 
							/>
						</view>
					</view>
				</u-card>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allFundList : [],
				filterList:[],
				showFilter:false,
				foundDetail:{
				},
				userId:'668'
			}
		},
		onLoad(option) {
			// console.log(option)
			if(!this.allFundList.length){
			}

		},
		methods:{
			// 获取基本详情信息
			getFoundDetail(code){
				const fundlist = [code].join()
				let url ="https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=200&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=" +
				        this.userId +
				        "&Fcodes=" +
				        fundlist;
				this.$u.get(url).then(res=>{
					this.foundDetail=res.Datas[0]
				})
				
			},
			customBack(){
				uni.reLaunch({url:'/pages/found/index'})
			},
			// 联想基金名称
			changeHandle(val){
				let ip = '/proxy-api'
				// #ifdef MP-WEIXIN
				 ip = 'https://fundsuggest.eastmoney.com'
				// #endif
				const url= ip+"/FundSearch/api/FundSearchAPI.ashx?&m=9&key=" +val +"&_=" +new Date().getTime();
				this.$u.get(url).then(res=>{
					this.filterList = res.Datas
					this.showFilter = true
				})
			},
			searchHandle(val){
				this.changeHandle(val)
			},
			// 点击item
			clickItemHandle(item){
				this.showFilter = false
				this.getFoundDetail(item.CODE)
			},
			// 添加我的自选
			addMyChoice(detail){
				const { FCODE } = detail
				let myFoundCodes = []
				uni.getStorage({
				key:'myFoundCodes',
				complete:(res)=>{
					if(res.data){
						// console.log(res.data,111)
						myFoundCodes = res.data
					}
					if(!myFoundCodes.includes(FCODE)){
						myFoundCodes.push(FCODE)
						uni.setStorage({
							key:'myFoundCodes',
							data:myFoundCodes,
							complete:(res)=>{
								this.$u.toast('添加成功!');
							},
						})
					}else{
						this.$u.toast('该基金已经添加了!');
					}
				}})
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-content {
	height: 100%;
	// padding: 20rpx 30rpx ;
	font-size: 13px;
		.u-search{
			padding: 40rpx 30rpx;
			background-color: #FFFFFF;
		}
		.scroll-wrap{
			// height: 300rpx;
			color: #303133;
			transition: .3;
		}
		.fund-item{
			padding: 10rpx 30rpx;
			border-bottom: 1px solid #F3F4F6;
			background-color: #FFFFFF;
		}
		.fund-item:hover{
			background-color: #F3F4F6;
		}
	}
</style>