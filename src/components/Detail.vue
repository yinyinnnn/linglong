<template>
	<div id="Detail" >
		<div v-for="item in bookinfo">
			<div class="main" >
				<div class="like" >
					 <div class="guess-like">猜你喜欢</div>
						<div class="all">
							
							<div :key="item1.productid" class="like-goods"  v-for="item1 in bookList" @click="godetail(item1.productname)">
								<a href="javascript:;">
									<div class="like-goods-img">
										<img :src="getImgUrl(item1.picture)" >
									</div>
								</a>
								<a href="javascript:;" >
									<div class="divname">{{item1.productname}}</div>
								</a>
								<div class="divbrand">{{item1.writer}}</div>
								<div class="div-price">
									<div class="div-money">
										￥{{item1.price}}
									</div>
								</div>
							</div>
						
						</div>
				</div>
				<div class="leftarea" >
					<div class="mod">
						<div class="banner1">
							<img :src="getImgUrl(item.picture)"/>
						</div>
							
					</div>
					<div class="goodsDetail">
						<div class="gdName" style="height: 20px;">
							
						</div>
						<div class="gdName">{{item.productname}} </div>
						<div class="infoItem" style="margin-top: 20px;">
							价格：&nbsp;&nbsp;
							<span class="infoItem-price">¥{{item.price}}元</span>
						</div>
						<div class="shipNote">
							<span class="free">免运费</span>
							<span class="real">正品授权</span>
						</div>
						<div class="amountCon">
							数量：&nbsp;&nbsp;
							<div class="mopt">
								<a @click="decrease">
									<img src="../assets/img/minus.png" >
								</a>
								<input type="text" name="" class="numberValue" v-model="inputValue"  ref="getValue" />
								<span>{{inputValue}}</span>
								<a @click="crease">
									<img src="../assets/img/add.png" >
								</a>
							</div>
						</div>
						<div class="buy-all">
							<a @click="payit" href="javascript:;" class="buy-now">立即购买</a>
						</div>
						<div class="twoBtn">
							<a href="javascript:;" class="join-cart">
								<span @click="gocart(item)" class="join-cart-btn">加入购物车</span>
							</a>
							<a href="javascript:;"class="share-it">
								<span class="share-it-Btn">分享</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			<!-- 商品图片区 -->
			<div class="picture">
				<div class="goodsDetail-img">
					<img :src="getImgUrl(item.content)" >
				</div>
			</div>
			<div class="guide">
				<div class="shopping-guide">
					购物指南
				</div>
				<div class="navItemCon">
					<p>- 所有商品均为正品保证。</p>
					<p>- 中国大陆地区免运费，默认商家合作快递。</p>
					<p>- 蜡烛、液态品、手表等含电池产品无法空运，运输时间相较普通空运件会更久。</p>
					<p>- 如出现产品质量问题请在签收后72小时内联系客服。</p>
				</div>
			</div>

		 
		</div>
	</div> 
</template>

<script>
	export default{
		data(){
			return{
				inputValue:'1',
				bookList : [
					// {
					// 	bookid:1,
					// 	bookname:'《Younger》第二期',
					// 	price : 99,
					// 	writer : '311',
					// 	bookImg : require('../assets/img/img1.jpg'),
					// },
					// {
					// 	bookid:2,
					// 	bookname:'《Younger》第二期',
					// 	price : 99,
					// 	writer : '311',
					// 	bookImg : require('../assets/img/img1.jpg'),
					// },
				],
				bookinfo:[],
			}
		},
		created(){

			var username1 = sessionStorage.getItem('username');
			console.log(username1);
			this.productname = sessionStorage.getItem('productname');
			
			window.scroll({ top: 0, left: 0, });
			this.getbookinfo();
			this.getbookList();
		},
		methods:{
			async getbookinfo(){
				await this.axios.get('http://localhost:8090/api_goodcheck/productName',{
					params : {
						productName:this.productname,
					},
					headers:{'content-type': 'application/json'}
				}).then(res => {
					// console.log(res);
					this.bookinfo = res.data.data.list;
					// console.log(this.bookinfo);
				}).catch(err=>{
			
				});
			},
			async getbookList(){
				await this.axios.get('http://localhost:8090/api_goodcheck/productName',{
					params : {
						page : 2,
						pageSize : 2,
					},
					headers:{'content-type': 'application/json'}
				}).then(res => {
					this.bookList = res.data.data.list;
					console.log(inputValue);
				}).catch(err=>{
			
				});
			},
			godetail(productname){
				this.$router.go(0);
				window.sessionStorage.setItem('productname',productname);
				this.$router.push('/goodsdetail');
			},
			decrease(){
				let val=this.inputValue;
				val--;
				if(val<1){
					val=1;
				};
				console.log(val);
		        this.inputValue = val;
			},
			crease(){
				let val=this.inputValue;
				val++;
				// console.log(val);
				this.inputValue = val;
			},
			payit(){
				this.$router.push('/pay');
			},
			async gocart(item){
				var userid1 =window.sessionStorage.getItem('userid');
				var Addparams ={
					userid:userid1,
					productid:item.productid,
					count:this.inputValue
				}
				console.log(Addparams)
				// var params = JSON.stringify(Addparams)
				await this.axios.post('http://localhost:8090/api_cartadd',Addparams,{
				headers:{'content-type': 'application/json'}	
				}).then(res =>{
					console.log(res)
				})
				window.sessionStorage.setItem('inputValue',this.inputValue);
				this.$router.push('/cart');
				console.log(item);
			},
			getImgUrl(url){
			   return require("../assets" +url);
			}
		},
		updated(){
			// console.log(this.inputValue);
		}
	}
	
</script>

<style lang="less" scoped>
	#Detail{
		.main{
			width: 1000px;
			margin: 0 auto;
			padding-top: 20px;
			height: auto;
		}
		.position{
			width: 100%;
			height: 20px;
			line-height: 20px;
			color: #bfbfbf;
			font-weight: normal;
			vertical-align: middle;
			padding: 10px 0px 5px 0px;
			font-size: 12px;
			font-family: 'Hiragino Sans GB','冬青黑体','Hiragino Kaku Gothic ProN','Microsoft Yahei' ,'Simsun','Arial', 'Helvetica', 'sans-serif';
		}
		.position a{
			color: #bfbfbf;
		}
		.like{
			float: right;
			width: 200px;
			margin-right: 35px;
			height: 1309px;
		}
		.like .guess-like{
			margin-left: 30px;
			font-size: 14px;
		    font-weight: bold;
		}
		.all{
			margin-top: 10px;
		}
		.like-goods{
			width: 100%;
			height: 320px;
			margin-left: 30px;
		}
		.like-goods a{
			color: #878787;
		}
		.like-goods-img img{
			width: 200px;
			height: 200px;
		}
		.divname{
			padding-top: 10px;
			font-size: 12px;
			line-height: 1.5;
			word-break: break-all;
			height: auto;
			overflow: hidden;
			text-overflow: ellipsis;
			color: rgb(51,51,51);
		}
		.divbrand{
			margin-top: 7px;
			font-size: 12px;
			color: rgb(153,153,153);
		}
		.div-money{
			margin-top: 0px;
			float: left;
			height: 24px;
			color: #3193F3;
			font-size: 14px;
		}
		.leftarea{
			width: 750px;
			height: 350px;
		}
		.mod{
			width: 350px;
			position: relative;
		}
		.mod #prev{
			top: 393px;
			width: 10px;
			height: 18px;
			left: -20px;
			background: url(../assets/img/prev.png) no-repeat;
			background-size: 10px 18px;
		}
		.mod #next{
			top: 393px;
			width: 10px;
			height: 18px;
			right: -15px;
			background: url(../assets/img/next.png) no-repeat;
			background-size: 10px 18px;
		}
		.btn{
			position: absolute;
			cursor: pointer;
			z-index: 99;
			font-size: 50px;
			font-weight: bold;
		}
		.picBox{
			width: 350px;
			height: 350px;
			position: relative;
			overflow: hidden;
			background: #fff;
		}
		.picBox ul{
			height: 377px;
			position: absolute;
			width: 1480px;
			left: -1050px;
			float: left;
		}
		.picBox ul li{
			width: 350px;
			height: 377px;
			position: relative;
			color: #fff;
			float: left;
		}
		.banner1 img{
			width: 350px;
			height: 350px;
			background-position: center;
			background-size: contain;
		}
		.listBox{
			width: 350px;
			height: 80px;
			position: relative;
			padding-top: 15px;
			overflow: hidden;
		}
		.listBox ul{
			width: 344px;
			left: -8px;
			height: 88px;
			position: absolute;
			padding-left: 6px;
		}
		.listBox ul li{
			width: 66px;
			height: 66px;
			cursor: pointer;
			position: relative;
			padding: 8px 0 0 0;
			margin: 0 2px;
			color: #fff;
			float: left;
		}
		#small1{
			width: 63px;
			height: 63px;
			background-image: url(../assets/img/img11.jpg);
			background-position: center;
			background-size: cover;
		}
		#small2{
			width: 63px;
			height: 63px;
			background-image: url(../assets/img/img29.jpg);
			background-position: center;
			background-size: cover;
		}
		#small3{
			width: 63px;
			height: 63px;
			background-image: url(../assets/img/img30.jpg);
			background-position: center;
			background-size: cover;
		}
		#small4{
			width: 63px;
			height: 63px;
			background-image: url(../assets/img/img31.jpg);
			background-position: center;
			background-size: cover;
		}
		.goodsDetail{
			margin-top: -350px;
			margin-right: 40px;
			width: 330px;
			height: auto;
			float: right;
		}
		.gdName{
			margin-top: 10px;
			font-size: 30px;
			height: auto;
			line-height: 26px;
			vertical-align: middle;
			padding: 0px 0px;
			color: #333;
			width: 330px;
		}
		.gdName a{
			color: #878787;
		}
		.infoItem{
			width: 330px;
			font-size: 12px;
			line-height: 18px;
			color: rgb(153,153,153);
			padding-top: 5px;
			padding-bottom: 32px;
		}
		.infoItem-price{
			color: rgb(16,131,255);
			font-size: 18px;
		}
		.shipNote{
			font-size: 12px;
			width: 300px;
			margin-bottom: 20px;
		}
		.free{
			background: url(../assets/img/flight.png) no-repeat left center;
			margin-left: 0px;
			background-size: 14px 14px;
			padding-left: 17px;
			color: rgb(153,153,153);
		}
		.real{
			background: url(../assets/img/star.png) no-repeat left center;
			margin-left: 0px;
			background-size: 14px 14px;
			padding-left: 17px;
			color: rgb(153,153,153);
		}
		.colorCon{
			width: 330px;
			height: 70px;
			padding: 5px 0px;
			margin-bottom: 10px;
			line-height: 54px;
			vertical-align: top;
			margin-top: 10px;
			font-size: 14.5px;
			color: #393433;
		}
		.color{
			float: left;
			font-size: 12px;
			color: rgb(153,153,153);
		}
		.small-img{
			width: 80%;
			list-style: none;
			float: left;
		}
		.small-img1{
			float: left;
			text-align: center;
			border: 1px solid black;
			background: #fff;
			color: black;
			min-width: 43px;
		}
		.imgCon{
			width: auto;
			height: 34px;
			border: 1px solid #fff;
		}
		.imgCon img{
			width: 34px;
			height: 34px;
		}
		.name{
			width: auto;
			height: 20px;
			font-size: 12px;
			display: block;
			text-align: center;
			min-width: 34px;
			white-space: nowrap;
			line-height: 20px;
			vertical-align: middle;
			overflow: hidden;
			border: 1px solid #fff;
		}
		.small-img2,.small-img3{
			float: left;
			text-align: center;
			border: 1px solid white;
			background: #fff;
			color: black;
			min-width: 43px;
		}
		.amountCon{
			font-size: 12px;
			color: rgb(153,153,153);
			border-bottom-color:white;
			width: 330px;
			padding: 0px 0px 10px 0px;
			margin-top: 10px;
			line-height: 24px;
			vertical-align: bottom;
		}
		.mopt{
			height: 32px;
			font-size: 0px;
			display: inline-block;
			vertical-align: top;
		}
		.mopt a{
			color: black;
			width: 13px;
			height: 13px;
			font-size: 13px;
			line-height: 11px;
			vertical-align: middle;
			background: #fff;
			text-align: center;
			border: 0px solid black;
			display: inline-block;
			
		}
		.mopt input{
			margin: 0px 7px;
			width: 52px;
			height: 24px;
			display: inline-block;
			line-height: 24px;
			vertical-align: middle;
			color: #666;
			font-size: 13px;
			background: white;
			text-align: center;
			outline: none;
			border: 1px solid rgb(238,238,238);
			font-family: 'Hiragino Sans GB','冬青黑体','Hiragino Kaku Gothic ProN','Microsoft Yahei' ,'Simsun','Arial', 'Helvetica', 'sans-serif';
		}
		.mopt a img{
			width: 13px;
			height: 13px;
		}
		.buy-all{
			padding-bottom: 0px;
			margin-top: 5px;
			width: 330px;
			font-size: 21.8px;
			color: #999;
			font-weight: 100;
			text-align: center;
			padding: 10px 0px;
			line-height: 24px;
			vertical-align: middle;
		}
		.buy-now{
			background: black;
			width: 330px;
			height: 42px;
			line-height: 42px;
			display: inline-block;
			border: none;
			color: #fff;
			font-size: 18px;
		}
		.twoBtn{
			height: 36px;
			width: 330px;
			font-size: 14.5px;
			padding: 10px 0px;
			line-height: 24px;
			vertical-align: middle;
			color: #393433;
		}
		.join-cart{
			display: inline-block;
			width: 160px;
			height: 32px;
			color: black;
			line-height: 32px;
			font-size: 13px;
			border: 1px solid black;
			background-color: #fff;
			background: url(../assets/img/carticon.png) no-repeat;
			float: left;
			background-size: 15px;
			background-position: 38px 8px;
		}
		.join-cart-btn{
			margin-left: 56px;
		}
		.share-it{
			display: inline-block;
			width: 160px;
			height: 32px;
			color: black;
			line-height: 32px;
			font-size: 13px;
			border: 1px solid black;
			background-color: #fff;
			background: url(../assets/img/upload.png) no-repeat;
			float:right;
			background-size: 12px;
			background-position: 55px 7px;
		}
		.share-it-Btn{
			margin-left: 74px;
		}
		.picture{
			width: 720px;
			margin-top: 40px;
			margin-left: 240px;
		}
		.goodsDetail-img img{
			width: 720px;
			display: block;
		}
		.brand{
			margin-left: 240px;
			margin-top: 30px;
			font-size: 17px;
			color: rgb(38,38,38);
			background: url(../assets/img/note.png) no-repeat ;
			background-size: 20px 21px;
		}
		.brand-detail,.shopping-guide{
			margin-left: 25px;
		}
		.navItemCon-content{
			margin-top: 20px;
			color: rgb(51,51,51);
			line-height: 2;
			word-break: break-all;
			width: 718px;
			height: auto;
			overflow: hidden;
			font-size: 12px;
		}
		.guide{
			margin-left: 240px;
			margin-top: 30px;
			font-size: 17px;
			color: rgb(38,38,38);
			background: url(../assets/img/eye.png) no-repeat ;
			background-size: 20px 21px;
		}
		.navItemCon{
			margin-top: 20px;
			color: rgb(51,51,51);
		}
		.navItemCon p {
			font-size: 12px;
			line-height: 3;
		}
		.aftre-sales{
			position: relative;
			width: 1000px;
			height: 28px;
			margin-left: 240px;
		}
		.aftre-sales img{
			width: 100px;
			height: 28px;
			display: block;
		}
		.cusService{
			position: absolute;
			z-index: 999;
			bottom: 33px;
			font-size: 12px;
			color: rgb(102,102,102);
			border: 3px solid rgb(237,237,237);
			background: rgb(255,255,255);
			padding: 24px 30px;
			width: 592px;
			display: none;
		}
		.aftre-sales:hover .cusService{
			display: block;
		}
		.reminder{
			font-weight: bold;
		}
		.reminder-text{
			padding-left: 2em;
		}
		.aftre-sales-service{
			padding-left: 2em;
		}
		.return{
			padding-left: 2em;
			margin-top: 8px;
		}
		.connect{
			margin-top: 1em;
		}
	}
</style>
