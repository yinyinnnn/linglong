<template>
	<div id="CartList">
		<div class="main">
			<div class="shoppingStep">
				|<div class="item">
					<span class="txt chk">购物车</span>
				</div>|
				<div class="item">
					<span @click="payit" class="txt">结算</span>
				</div>|
			</div>
			
			<el-table
				ref="multipleTable"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
				@selection-change="handleSelectionChange">
				<el-table-column
				  type="selection"
				  width="65">
				</el-table-column>
				<el-table-column
				  prop="picture"
				  label="图片"
				  width="150">
				  <template scope="scope">
				    <img :src="scope.row.picture" class="goods-img"/>
				  </template>
				</el-table-column>
				<el-table-column
				  prop="productname"
				  label="商品"
				  width="200">
				</el-table-column>
				<el-table-column
				  prop="count"
				  label="数量"
				  width="120">
				</el-table-column>
				<el-table-column
				  prop="price"
				  label="单价（元）"
				  show-overflow-tooltip>
				</el-table-column>
				<el-table-column
				  prop="countPrice"
				  label="小计（元）"
				  show-overflow-tooltip>
				</el-table-column>
				 <el-table-column label="操作">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
			  </el-table>
		<!-- 价格区 -->
			<div class="shoppcarOpt">
				<p>
					<span>商品总价</span>
					<span class="a">/</span>
					<span class="price">￥
					  <span >{{totalprice}}</span>
					</span>
				</p>
				<p>
					<input type="button" class="checkout" name="" id="" value="立即结算" @click="payit" />
				</p>
				<fieldset id="">
					<legend>
						<a href="index.html">继续购物</a>
					</legend>
				</fieldset>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				number:'',
				productname:'',
				productid:'',
				picture:'',
				totalprice:0,
				countPrice:'',
				tableData: []
			}
		},
		methods:{
			async gettableData(){
				await this.axios.get(
				'http://localhost:8090/api_cart_search',{
				headers:{'content-type': 'application/json'}}).then(res => {
					// console.log(res)

					const dataResult = res.data.data
					let newDataResult = new Array();
					dataResult.forEach(item=>{
						let countPri = item.price*item.count
						newDataResult.push({
							cartid: item.cartid,
							count: item.count,
							picture: this.getImgUrl(item.picture),
							price: item.price,
							productid: item.productid,
							productname: item.productname,
							userid: item.userid,
							countPrice:countPri
						})

						
					})
					
					this.tableData = newDataResult;
				}).catch(err=>{
			
				});
			},
			async payit(){
				this.$router.push('/pay');
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
					});
				}else{
					this.$refss.multipleTable.clearSelection();
				}
				console.log(rows)
			},
		       async handleDelete(index, row) {

				   await this.axios.delete('http://localhost:8090/api_cartdel',{
					   params:{
						   cartId:row.cartid
					   },
					  headers:{'content-type': 'application/json'}
					}).then(res => {
					this.$router.go(0)
				   }).catch(err=>{
				   
				   });
		    },
			handleSelectionChange(val) {
				this.totalprice=0;
				let totalPriceNew =0;
				val.forEach(item=>{
					totalPriceNew=totalPriceNew+item.countPrice;
				})
				this.totalprice=totalPriceNew;
				window.sessionStorage.removeItem('newDataResult');
				window.sessionStorage.setItem('newDataResult',JSON.stringify(val));

				// list.forEach(item=>{
				// 	console.log(item)
				// })
			},
			getImgUrl(url){
			   return require("../assets" +url);
			},
			
		},
		created(){
			this.number = sessionStorage.getItem('inputValue');
			this.productname = sessionStorage.getItem('productname');
			window.sessionStorage.removeItem('newDataResult');
			// console.log(this.number)
			// console.log(this.productname)
			window.scroll({ top: 0, left: 0, });
			this.gettableData();
		}
	}
</script>

<style lang="less" scoped>
	#CartList{
		.main{
			width: 1000px;
			margin: 0 auto;
			padding-top: 10px;
			clear: both;
		}
		.shoppingStep{
			width: 100%;
			color: #333;
			vertical-align: middle;
			padding: 50px 0px 10px 0px;
			height: 32px;
			text-align: center;
			font-size: 14px;
		}
		.item{
			width: auto;
			height: 30px;
			display: inline-block;
			line-height: 30px;
		}
		.txt{
			width: 135px;
			height: 20px;
			display: block;
			cursor: pointer;
		}
		
		.chk{
			color: #0d3f7a;
		}
		.shoppingList{
			margin-top: 20px;
			width: 100%;
			color: #666;
		}
		.carTab{
			width: 100%;
			border-bottom: 2px solid #ccc;
		}
		table{
			border-collapse: collapse;
			border-spacing: 0;
		}
		.txt1{
			text-align: left;
		}
		.carTab tr th{
			border-bottom: 2px solid #ccc;
			padding: 15px 5px;
			font-size: 15px;
			font-weight: normal;
		}
		.checkbox{
			margin-left: 12px;
			width: 12px;
			height: 12px;
			display: inline-block;
			margin-right: 2px;
		}
		.itemlist td{
			border-bottom: 1px solid #f0f0f0;
		}
		.carTab tr td{
			padding: 15px 5px;
			vertical-align: top;
		}
		.goods-img{
			display: inline-block;
			width: 70px;
			height: 70px;
			vertical-align: top;
			color: #878787;
		}
		.goods-img img{
			width: 68px;
			height: 68px;
			border: 1px solid #f0f0f0;
			vertical-align: top;
		}
		.b{
			font-size: 12px;
		}
		.t a{
			color: #878787;
			font-size: 12px;
		}
		.opt{
			margin: 0 -4px;
			width: 20px;
			height: 20px;
			display: inline-block;
			text-align: center;
			vertical-align: middle;
			font-weight: bold;
			line-height: 18px;
			cursor: pointer;
		}
		.num2{
			width: 24px;
			height: 18px;
			border: none;
			display: inline-block;
			text-align: center;
			outline: none;
		}
			
		.max-min{
			text-align: center;
			font-size: 12px;
		}
		.blue{
			color: #0d3f7a;
		}
		.shoppcarOpt{
			width: 100%;
			text-align: center;
			padding: 20px 0px;
		}
		.shoppcarOpt p{
			font-size: 14px;
			line-height: 30px;
		}
		.a{
			font-size: 18px;
		}
		.price{
			color: #0d3f7a;
			font-size: 20px;
			display: inline-block;
			margin-left: 10px;
		}
		.checkout{
			display: inline-block;
			width: 168px;
			height: 30px;
			color: #fff;
			line-height: 30px;
			vertical-align: middle;
			text-align: center;
			background: #0d3f7a;
			margin-top: 5px;
			border: none;
			outline: none;
			cursor: pointer;
		}
		.shoppcarOpt fieldset{
			border: 1px solid #ccc;
			border-left: none;
			border-right: none;
			border-bottom: none;
			font-size: 14px;
			color: #404040;
			width: 60px;
			padding: 0 54px;
			display: inline-block;
			margin-top: 15px;
		}
		.shoppcarOpt fieldset a{
			color: #404040;
		}
		.noGoods{
			margin-top: 96px;
			width: 640px;
			height: 280px;
			background-color: rgb(255,255,255);
			box-shadow: rgb(170,170,170) 2px 1px 2px;
			overflow: hidden;
			margin-left: auto;
			margin-right: auto;
		}
		.noGoods img{
			width: 150px;
			height: 110px;
			margin-top: 40px;
			margin-left: 245px;
		}
		.noGoods-label{
			margin-top: 15px;
			background: #fff;
			height: 24px;
			font-size: 24px;
			color: #999;
			line-height: 24px;
			text-align: center;
			width: 300px;
			margin-left: 170px;
		}
		
	}
	#CartList /deep/.cell{
		padding-left: 15px;
	}
</style>
