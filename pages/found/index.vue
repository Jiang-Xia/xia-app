<template>
	<view class="found-wrap">
		<u-navbar 
		:back-text-style="{color:'#fff'}" 
		:is-back="true" 
		title="我的基金" 
		title-color="#fff"
		:custom-back="customBack"
		back-icon-color="#fff"
		:background="{backgroundColor:'#fc5185'}"
		></u-navbar>
		
		<u-search :disabled="true" placeholder="请输入基金编码或名称搜索" :show-action="false" @click="gotoSearch"></u-search>
		<view class="push-title">
			大盘指数：
			<text>({{subTitle}})</text>
		</view>
		<view class="push-wrap">
			<view
				class="stock-card"
				v-for="(item,index) of stockList"
				:key="item.f12">
				<text class="stock-title">{{item.f14}}</text>
				<view>
					<u-tag
						style="display: block; text-align: center; margin-bottom: 8rpx;"
						:text="item.f2" 
						shape="circle"
						:type="item.f3<0?'success':'error'"
					/>
					<u-tag
						style="width: 50%;text-align: right; border-right:none;"
						:text="item.f4" 
						shape="circleLeft"
						:type="item.f3<0?'success':'error'"
					/>
					<u-tag
						style="width: 50%;text-align: left;"
						:text="item.f3+' %'" 
						shape="circleRight"
						:type="item.f3<0?'success':'error'"
					/>
				</view>
			</view>
		</view>
		
		<!-- 我的自选 -->
		<u-cell-group style="margin:30rpx;width:auto;">
				<u-cell-item
				v-for="(item,index) of myFoundList"
				:key="item.FCODE"
				:title="item.SHORTNAME"
				:arrow="false" >
					<u-tag
					style="text-align: left;"
					:text="item.GSZ+' '+item.GSZZL+' %'" 
					shape="circleRight"
					:type="item.GSZZL.indexOf('-')!==-1?'success':'error'"
					/>
				</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stockList:[],// 大盘指数列表
				timeInter:null,
				// 个人持有基金 缓存code
				myFoundCodes:[],
				myFoundList:[]
			}
		},
		computed:{
			subTitle(){
				let str  = '更新于：'
				let date = new Date()
				str+=date.toLocaleDateString() +"  "+ date.toLocaleTimeString()
				return str
			}
		},
		onLoad() {
			this.getStockDetail()
			uni.getStorage({
			key:'myFoundCodes',
			complete:(res)=>{
				if(res.data){
					this.myFoundCodes = res.data
					this.getFoundDetail(res.data)
				}
			}})
		},
		onUnload(){
			clearTimeout(this.timeInter)
			 this.timeInter = null
		},
		methods:{
			getStockUrl(){
				const seciList = ['1.000001','1.000300','0.399001','0.399006']
				const seciListStr = seciList.join()
				let url ="https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f2,f3,f4,f12,f13,f14&secids=" +
				       seciListStr +
				       "&_=" +new Date().getTime();
				return url
			},
			// 获取大盘信息
			getStockDetail(){
				// 轮询
				this.$u.get(this.getStockUrl()).then(res=>{
					this.stockList=res.data.diff||[]
				})
				this.timeInter = setTimeout(() => {
				  this.getStockDetail()
				}, 300000)
			},
			// 获取持有基金数据
			getFoundDetail(){
				// 去重
				const fundlist = Array.from(new Set(this.myFoundCodes)).join()
				let url ="https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=200&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=" +
								this.userId +"&Fcodes=" +fundlist;
				this.$u.get(url).then(res=>{
					this.myFoundList = res.Datas
				})
			},
			gotoSearch(){
				uni.navigateTo({url:'/pages/found/search?a=1'})
			},
			customBack(){
				uni.reLaunch({url:'/pages/example/index'})
			}
		}
	}
</script>

<style lang="scss">
.found-wrap {
	padding-bottom: 40rpx;
	.push-title{
		font-weight: 600;
		font-size: 32rpx;
		line-height: 1.5;
		padding: 10rpx 24rpx;
		text{
			font-weight: normal;
			font-size: 28rpx;
			color: #C0C4CC;
		}
	}
	.push-wrap{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		padding: 10rpx;
	}
	.stock-title{
		font-weight: 600;
		font-size: 28rpx;
		line-height: 1.5;
	}
	.stock-card{
		width: 45%;
		margin-bottom: 16rpx;
	}
	.u-card{
		width: 45%;
	}
	.u-search{
			padding: 40rpx 30rpx;
			background-color: #FFFFFF;
	}
	}
</style>