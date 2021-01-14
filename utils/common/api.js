/* 
	// 获取基金假期信息
	   let url = "https://x2rr.github.io/funds/holiday.json";
 */

/* 

// 查询基金
 let url =
          "https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?&m=9&key=" +
           query +
           "&_=" +
           new Date().getTime();
 */

/* 
	// 获取大盘指数  seciListStr（大盘代号） 可批量
  let url =
         "https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f2,f3,f4,f12,f13,f14&secids=" +
         seciListStr +
         "&_=" +
         new Date().getTime();
 */


/* 
  // 获取大盘 k线图数据
	 获取上证指数k线图数据 ：http://push2.eastmoney.com/api/qt/stock/fflow/kline/get?lmt=0&klt=1&secid=1.000001&secid2=0.399001&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63&_=1610595145910
	
 */

/* 
  // 获取大盘 成交量数据
	https://push2.eastmoney.com/api/qt/stock/trends2/get?secid=${this.code}&fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f53,f56,f58&iscr=0&iscca=0&ndays=1&forcect=1`	
 */

/* 
 // 行情中心的行业板块资金变化
	   let url = `http://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=500&po=1&np=1&fields=f12,f13,f14,f62&fid=f62&fs=m:90+t:2&_=${new Date().getTime()}`;
 */

/* 
// 获取基金详情（可批量 列表）
userId（用户id）
fundlist 基金代码list
 let url =
         "https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=200&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=" +
         this.userId +
         "&Fcodes=" +
         fundlist;
 */

/* 
 // 获取基金持仓信息
 fundcode 基金代码
 let url = `https://fundmobapi.eastmoney.com/FundMNewApi/FundMNInverstPosition?FCODE=${
         fundcode
       }&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&Uid=&_=${new Date().getTime()}`;
 */

/* 
		// 获取基金净值估算
		let url = `https://fundmobapi.eastmoney.com/FundMApi/FundVarietieValuationDetail.ashx?FCODE=${
		        this.fund.fundcode
		      }&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&_=${new Date().getTime()}`;
					
   // 获取基金概况信息
	 let url = `https://fundmobapi.eastmoney.com/FundMApi/FundBaseTypeInformation.ashx?FCODE=${
	         this.fund.fundcode
	       }&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&Uid=&_=${new Date().getTime()}`;
				 
	// 获取基金历史净值
	let url = `https://fundmobapi.eastmoney.com/FundMApi/FundNetDiagram.ashx?FCODE=${
	          this.fund.fundcode
	        }&RANGE=${
	          this.sltTimeRange
	        }&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&_=${new Date().getTime()}`;
	// 获取基金累计收益
	 let url = `https://fundmobapi.eastmoney.com/FundMApi/FundYieldDiagramNew.ashx?FCODE=${
	          this.fund.fundcode
	        }&RANGE=${
	          this.sltTimeRange
	        }&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&_=${new Date().getTime()}`;
 */

/* 
 获取对应的持仓股票信息
 let gpList = dataList
            .map((val) => {
              return val.NEWTEXCH + "." + val.GPDM;
            })
            .join(",");
 let gpUrl = `https://push2.eastmoney.com/api/qt/ulist.np/get?fields=f1,f2,f3,f4,f12,f13,f14,f292&fltt=2&secids=${gpList}&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&Uid=`;
 */

/* 
  // 获取当前基金的历届基金经理
	 let url = `https://fundmobapi.eastmoney.com/FundMApi/FundManagerList.ashx?FCODE=${code}&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&Uid=&_=${new Date().getTime()}`;
  // 获取当前任职基金经理的详情
	let url = `https://fundmobapi.eastmoney.com/FundMApi/FundMangerDetail.ashx?FCODE=${code}&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&Uid=&_=${new Date().getTime()}`;
 */