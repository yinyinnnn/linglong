<template>
	<div id="Book">
		<div class="bookimg first" v-for="item in bookList" @click="godetail(item.productname)">
			<a href="javascript:;"class="img-hover">
				<img class="first-img" :src="getImgUrl(item.picture)" >
			</a>
			<a href="javascript:;" class="goodsInfo" >
				<p class="money">￥{{item.price}}</p>
				<p class="tle">{{item.productname}}</p>
			</a>
		</div>
		<!-- <div class="bookimg">
			<a href="#">
				<img class="first-img" src="../assets/img/img11.jpg" >
			</a>
			<a href="#" class="goodsInfo position1">
				<p class="money">￥58.00</p>
				<p class="tle">《京都漫步：穷游》 | [京都]特辑</p>
				<p class="desc">兼顾人文性与实用性的旅行指南</p>
			</a>
		</div>
		<div class="bookimg">
			<a href="#">
				<img class="first-img" src="../assets/img/img12.jpg" >
			</a>
			<a href="#" class="goodsInfo position1">
				<p class="money">￥59.00</p>
				<p class="tle">《莫奈的树》 | 北京美术出版社</p>
				<p class="desc">欧洲畅销书 告诉你如何轻松看懂“莫奈”的画</p>
			</a>
		</div> -->
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bookList : [],
			}
		},
		methods:{
			async getbookList(){
				await this.axios.get('http://localhost:8090/api_goodcheck/productName',{
					params : {
						page : 1,
						pageSize : 6,
					},
					headers:{'content-type': 'application/json'}
				}).then(res => {
					console.log(res);
					this.bookList = res.data.data.list;
				}).catch(err=>{
			
				});
			},
			godetail(productname){
				window.sessionStorage.setItem('productname',productname);
				this.$router.push('/goodsdetail');
			},
			getImgUrl(url){
			   return require("../assets" +url);
			}
		},
		created(){
			this.getbookList();
		}
	}
</script>

<style lang="less" scoped>
	#Book{
		.bookimg{
			width: 316px;
			height: 316px;
			margin: 0px 8px 30px 8px;
			display: inline-block;
			position: relative;
		}
		// .first{
		// 	margin-left: 0px;
		// 	flex-direction: row;
		//     display: flex;
		// 	flex-wrap: wrap;
		// 	justify-content: space-between;
		// 	display: inline-block;
		// }
		.first-img{
			width: 316px;
			height: 316px;
			
		}
		.goodsInfo{
			width: 286px;
			height: 286px;
			padding: 15px;
			position: absolute;
			top: 0px;
			left: 0px;
			background: black;
			opacity: 0.7;
			display: none;
		}
		.goodsInfo p{
			margin: 0 auto;
			text-align: center;
			height: 25px;
			width: 85%;
			line-height: 20px;
			vertical-align: middle;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-weight: bold;
			color: #fff;
		}
		.bookimg:hover .goodsInfo{
			display: block;
		}
		.money{
			text-align: left !important;
			width: 97%;
			margin-top: 4px;
			color: #0c6eba !important;
			font-size: 20px;
			font-style: italic;
			margin-left: 0px !important;
		}
		.tle{
			margin-top: 118px !important;
			font-size: 14px;
		}
		.desc{
			font-size: 12px;
			font-weight: 100;
			margin-top: 5px;
			white-space: normal;
			height: auto;
		}
	}
</style>
