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
				<view class="stock-title">{{item.f14}}</view>
				<view>
					<text
						class="stock-index"
						:style="{
							color:item.f3<0?'#19be6b':'#fa3534'
						}"
					>{{item.f2}}</text>
						<view style="text-align: center;">
							<text
								:style="{
									color:item.f3<0?'#19be6b':'#fa3534'
								}"
							>{{item.f4}}</text>
							<text
								style="margin-left: 10rpx;"
								:style="{
									color:item.f3<0?'#19be6b':'#fa3534'
								}"
							>{{item.f3}}%</text>
						</view>
				</view>
			</view>
		</view>
		
		<!-- 我的自选 -->
		<view class="my-founds">我的自选
			<u-icon name="trash" @click="modelShow=true"></u-icon>
		</view>
		<u-swipe-action v-for="(item,index) of myFoundList"
				:key="item.FCODE"
				:options="options"
				:show="item.show" 
				:index="index" 
				@click="click"
				>
			<view class="item u-border-bottom">
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="found-title clearfix">
					<text>{{ item.SHORTNAME }}</text>
					<u-tag
					style="text-align: left; float: right; width: 240rpx;"
					:text="item.GSZ+' '+item.GSZZL+' %'" 
					shape="circleRight"
					:type="item.GSZZL.indexOf('-')!==-1?'success':'error'"
					/>
				</view>
			</view>
		</u-swipe-action>
		<u-modal title="清空自选" v-model="modelShow" @confirm="delAllMyFounds" :content="modelContent"></u-modal>
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
				myFoundList:[],
				options: [
						{
							text: '详情',
							style: {
								backgroundColor: '#007aff'
							}
						},
						{
							text: '删除',
							style: {
								backgroundColor: '#dd524d'
							}
						}
				],
				modelShow:false,
				modelContent:"确认全部移出自选吗?"
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
					this.myFoundList = res.Datas.map((v,i)=>{
						v.show = false
						v.index = i
						return v
					})
				})
			},
			gotoSearch(){
				uni.navigateTo({url:'/pages/found/search?a=1'})
			},
			customBack(){
				uni.reLaunch({url:'/pages/example/index'})
			},
			click(index, index1) {
				if(index1 == 1) {
					this.$u.toast(`移除`+this.myFoundList[index].SHORTNAME+'自选');
					this.myFoundCodes.splice(this.myFoundCodes.indexOf(this.myFoundList[index].FCODE), 1);
					this.myFoundList.splice(index, 1);
					uni.setStorage({
					key:'myFoundCodes',
					data:this.myFoundCodes
					})
				} else {
					this.myFoundList[index].show = false;
					this.$u.toast(`详情`);
				}
			},
			// 清空自选
			delAllMyFounds(){
				this.myFoundList = []
				uni.setStorage({
				key:'myFoundCodes',
				data:[]
				})
				this.$u.toast(`清除成功`);
			}
		}
	}
</script>

<style lang="scss">
.found-wrap {
	padding-bottom: 40rpx;
	.my-founds,.push-title{
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
		font-size: 24rpx;
		text-align: center;
	}
	.stock-index{
		display: block;
		text-align: center;
		font-weight: 600;
		font-size: 36rpx;
		line-height: 1.5;
	}
	.stock-card{
		width: 45%;
		margin-bottom: 16rpx;
	}
	.found-title{
		padding: 10rpx 24rpx;
	}
	.u-search{
			padding: 40rpx 30rpx;
			background-color: #FFFFFF;
		}
	}
</style>