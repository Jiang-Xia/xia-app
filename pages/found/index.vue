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
		<u-card  title="大盘信息" :sub-title="subTitle" >
			<u-cell-group slot="body" >
					<u-cell-item 
					v-for="(item,index) of stockList"
					:key="item.f12"
					:title="item.f14"
					:arrow="false" >
						<u-tag
						style="width: 80%;text-align: left;"
						:text="''+item.f2+' '+item.f4+' '+item.f3+' %'" 
						shape="circleRight"
						:type="item.f3<0?'success':'error'"
						/>
					</u-cell-item>
				</u-cell-group>
		</u-card>
		
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
<!-- 		<u-grid :col="3">
				<u-grid-item>
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">图片</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">沙漏</view>
				</u-grid-item>
				</u-grid> -->
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
				}, 3000)
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

<style lang="scss" scoped>
.found-wrap {
	padding-bottom: 40rpx;
		.u-search{
				padding: 40rpx 30rpx;
				background-color: #FFFFFF;
		}
	}
</style>