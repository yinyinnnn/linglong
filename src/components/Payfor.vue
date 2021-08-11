<template>
	<div id="Payfor">
		<div class="main">
		    <div class="cart-check">|
		       <div class="item">
		          <span class="item-cart" @click="gocart">购物车</span>
		         </div>|
		        <div class="item">
		           <span class="text item-check">结算</span>
		        </div>|
			</div>
			<div class="car-list">
			    <div class="palce">收货地址</div>
			    <div class="place-detail">
			        <ul class="address-list">
			            <li class="chk">
			                <div class="detail">
			                    <span class="detail-name">{{username}}</span>
			                </div>
			                <div class="address-detail">
			                    <p>{{address}}</p>
			                </div>
<!-- 			                <div class="handle">
			                    <div class="default">默认地址</div>
			                    <div class="del">删除</div>
			                </div> -->
			            </li>
			        </ul>
			    </div>
				<!-- <div class="newaddress">
			        <div class="container">
						<input type="checkbox" class="add-address-btn" />
						<span>使用新地址</span>					
			        </div>
			        <div class="con new-container">
			            <form action="" method="post" id="addrForm" name="addrForm">
			                <table>
			                    <tr>
			                        <td class="txt">收货人姓名</td>
			                        <td>
			                            <input type="text" class="inpt acceptname">
			                        </td>
			                    </tr>
			                    <tr>
			                        <td class="txt">省/市</td>
			                        <td>
			                            <select class="province">
			                                <option value="所在省份">所在省份</option>
			                            </select>
			                            <select class="city">
			                                <option value="所在市">所在市</option>
			                            </select>
			                            <select class="district">
			                                <option value="所在区">所在区</option>
			                            </select>
			                        </td>
			                    </tr>
			                    <tr>
			                        <td class="txt">详细地址</td>
			                        <td>
			                            <input type="text" class="inpt new-detail" id="address">
			                        </td>
			                    </tr>
			                    <tr>
			                        <td class="txt">手机号</td>
			                        <td>
			                            <input type="text" class="inpt new-phone" id="contact">
			                        </td>
			                    </tr>
			                    <tr>
			                        <td class="txt"></td>
			                        <td>
			                            <input type="button" class="addrAddBtn" value="保存地址">
			                        </td>
			                    </tr>
			                </table>
			            </form>
			        </div>
			    </div> -->
			</div>   
		    <form action="" method="post" >
		        <div class="order-detail arr-down">订单详情</div>
		        <div class="cartlist">
		            <ul class="order-detail-list">
		                <li v-for="item in newDataResult ">
		                    <div class="imgCon">
		                        <img :src="item.picture" alt="">
		                    </div>
		                    <div class="infoCon"> 
		                        <div class="t">
		                            <span class="goods-name">{{item.productname}}
		                            <br>
		                            </span>
		                            <span class="number">{{item.count}}</span>
		                            <span class="price">¥{{item.countPrice}}</span>
		                        </div>
		                    </div>
		                </li>
		            </ul>
		            <div class="nav"></div>
		        </div>
		        <div class="orderNote">
		             <div class="l">
		                备注：
		                <input type="text" class="inpt" maxlength="350" placeholder="您可在此写下订单备注,不得超过350字符">
		            </div>
		        </div>
		        
		        <div class="orderNote  relief">
		            <div class="r">
		                <!-- <p>满减活动减免    - 0.00 元</p>
		                <p>折扣活动减免    - 0.00 元</p> -->
		                <p class="p1">
		                    付款总额 : 
		                    <span class="priceNo">{{totalPrice}}元</span>
		                </p>
		                
		                <!-- <p class="p2">为您节省   0.00元</p>
		                <p class="p3">(含￥<span class="fee">0.00</span>礼物包装费)</p> -->
		            </div>
		        </div>
		    </form>	
			<div class="shoppingOpt">
			    <div class="navTle">结算方式</div>
			    <div class="payway">
			        <input type="radio" checked value="zfb">
			        <img valign="middle" src="../assets/img/pay.png" alt="">
			    </div>
			    <p class="tips">
			       <br>
			       若您遇到支付问题，请联系客服热线 400 897 6336（工作日 09:00-18:00）
			    </p>
			    <input type="button" value="结算" class="pay-btn">
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				newDataResult:[],
				totalPrice:0,
				address:'',
				username:''
			}
		},
		methods:{
			gocart(){
				this.$router.push('/cart');
			},
			math(){
				var data = window.sessionStorage.getItem('newDataResult');
				if(data == ''||data == null){
					return
				}
				var list = JSON.parse(data);
				var totalMath =0;
				
				list.forEach(item =>{
					totalMath=totalMath+item.countPrice;
				})
				this.totalPrice = totalMath;
			}
			
			
		},
		created(){
			// var count = sessionStorage.getItem('count');
			// var totalprice = sessionStorage.getItem('totalprice');
			// var productid = sessionStorage.getItem('productid');
			// var productname = sessionStorage.getItem('productname');
			var address =window.sessionStorage.getItem('address');
			var username = window.sessionStorage.getItem('username');
			this.username = username;
			console.log(address)
			this.address = address;
			var list = JSON.parse(window.sessionStorage.getItem('newDataResult'));
			this.newDataResult =list;
			console.log(list)
			this.math();
			// console.log(list);
			// console.log(this.newDataResult+'------------')
			// console.log(window.sessionStorage.getItem('newDataResult')+'66666')
		}
		
	}
</script>

<style lang="less" scoped>
	#Payfor{
		.main{
		    width: 1000px;
		    margin: 0 auto;
		}
		.Banner img{
		    width: 100%;
		}
		
		.cart-check{
		    width: 100%;
		    color: #333;
		    padding: 50px 0px 10px 0px;
		    text-align: center;
		    font-size: 14px;
		    height: 32px;
		    vertical-align: middle;
		}
		
		.cart-check .item{
		    height: 30px;
		    display: inline-block;
		    line-height: 30px;
		}
		
		.cart-check .item .item-cart{
		    width: 135px;
		    height: 20px;
		    display: block;
		    color: #666;
			cursor: pointer;
		}
		
		.cart-check .item .item-check{
		    color: #0d3f7a;
			display: block;
			width: 135px;
			cursor: pointer;
			height: 20px;
		}
		
		.car-list{
		    margin-top: 20px;
		    padding-bottom: 20px;
		    width: 100%;
		    color: #666;
		}
		
		.car-list .palce{
		    width: 100%;
		    font-size: 16px;
		    padding: 3px 0px;
		    color: #333;
		    height: 30px;
		    line-height: 30px;
		    text-align: left;
		    border-bottom: 1px solid  #999;
		}
		
		.main .place-detail{
		    width: 1000px;
		    /* height: 180px; */
		    color: #999;
			overflow: hidden;
		    margin-top: 30px;
		    position: relative;
		}
		
		.main .place-detail ul li{
		    display: block;
		    width: 202px;
		    height: 152px;
		    float: left;
		    overflow: hidden;
		    margin: 0px 10px;
		    cursor: pointer;
		    padding: 12px;
		    font-size: 13px;
			border: 1px solid #0d3f7a;
		}
		
		.main .place-detail ul .active-address{
		    border: 2px solid #0d3f7a;
		}
		
		.place-detail ul .detail{
		    height: 30px;
		    width: 100%;
		    border-bottom: 1px solid #ededed;
		    color: #333;
		}
		
		.place-detail ul span{
		    display: block;
		    line-height: 30px;
		    font-size: 13px;
		}
		
		.place-detail ul .detail-name{
		    float: left;
		}
		
		.place-detail ul .detail-tel{
		    float: right;
		}
		
		.place-detail ul li .address-detail{
		    height: 71px;
		    padding: 10px 0px;
		}
		
		.place-detail ul li .handle{
		    height: 30px;
		}
		
		.place-detail .default{
		    line-height: 30px;
		    vertical-align: middle;
			float: left;
			color:#0d3f7a;
		}
		
		.place-detail .del{
		    line-height: 30px;
		    vertical-align: middle;
			float: right;
		}
		
		.place-detail ul li .active{
		    color:#0d3f7a;
		}
		.newaddress{
		    width: 100%;
		    margin-top: 40px;
		    margin-bottom: 70px;
		}
		
		.container>input{
			position: relative;
			left: 0;
			top:2px;
		}
		.container>span{
			color: #666;
			font-size: 14px;
			position: relative;
		}
		.container span:after{
			content: '';
			display: block;
			position: absolute;
			right: -14px;
			top:8px;
			border: 5px solid transparent;
			border-top-color: #666;
		}
		
		
		.newaddress .con{
		    width: 100%;
		    font-size: 13px;
		    color: #777;
		    margin-top: 40px;
		}
		
		.new-container{
			height: 0;
			overflow: hidden;
		}
		
		.newaddress .con  table td{
		    padding: 8px 0px;
		    margin: 0px;
		}
		
		.newaddress .con table .txt{
		    width: 80px;    
		}
		
		.newaddress .con table .inpt,.newaddress .con table .province,.newaddress .con table .city,.newaddress .con table .district{
		    height: 24px;
		    width: 80px;
		    border: 2px solid #dedede;
		    padding: 0px 5px;
			outline: none;
		}
		
		.newaddress .con table .acceptname{
		    width: 144px;
		}
		
		#address{
		    width: 396px;
		}
		
		#contact{
		    width: 144px;
		}
		
		.newaddress .addrAddBtn{
		    display: inline-block;
		    width: 94px;
		    height: 25px;
		    background: #7fa6c5;
		    line-height: 25px;
		    text-align: center;
		    color: #fff;
		    font-size: 13px;
		    font-weight: 100;
		    border: none;
		    cursor: pointer;
		}
		
		.newaddress .addrAddBtn:hover{
		    background: blue;
		}
		
		.car-list .order-detail{
		    width: 100%;
		    font-size: 16px;
		    padding: 3px 0px;
		    color: #333;
		    height: 30px;
		    line-height: 30px;
		    text-align: left;
		    border-bottom: 1px solid #999;
		}
		
		.car-list .arr-down{
		    background: url(../assets/img/pay.png) center right no-repeat;
		    cursor: pointer;
		}
		
		.cartlist{
		    width: 100%;
		    margin-top: 30px;
		}
		
		.cartlist ul li{
		    width: 100%;
		    height: 72px;
		    padding: 10px 0px;
		    border-bottom: 1px solid #dedede;
		}
		
		.cartlist ul li .imgCon{
		    width: 72px;
		    height: 72px;
		    float: left;
		    padding: 0px 24px;
		}
		
		.cartlist ul li .imgCon img{
		    width: 72px;
		    height: 72px;
		}
		
		.cartlist ul li .infoCon{
		    width: 880px;
		    float: right;
		}
		
		.cartlist ul li .infoCon div{
		    border: none;
		    margin-top: 5px;
		    height: 30px;
		}
		
		
		
		.cartlist ul li .t{
		    width: 100%;
		    height: 14px;
		    padding-bottom: 10px;
		    border-bottom: 1px solid #dedede;
		    color: #6a6a6a;
		}
		
		.cartlist ul li .t span{
		    display: block;
		    float: left;
		    line-height: 20px;
		    margin: 0px 5px;
		    font-size: 13px;
		}
		
		.cartlist ul li .goods-name{
		    width: 590px;
		}
		
		.cartlist ul li .kind{
		    color: #999;
		}
		
		.cartlist ul li .number{
		    width: 60px;
		}
		
		.cartlist ul li .price{
		    width: 80px;
		}
		
		.cartlist .nav{
		    width: 100%;
		    border-bottom: 1px solid #999;
		    padding: 3px 0px;
		    margin-top: 10px;
		    height: 0px;
		}
		
		.orderNote{
		    width: 975px;
		    margin-top: 10px;
		    height: 36px;
		    padding-left: 25px;
		}
		
		.orderNote .l{
		    float: left;
		    height: 36px;
		    line-height: 36px;
		    font-size: 13px;
		}
		
		.orderNote .inpt{
		    width: 675px;
		    height: 28px;
		    background-color: #eeeeee;
		    border: none;
		    line-height: 28px;
		    padding: 0px 5px;
		}
		
		.ticket{
		    margin-top: 30px;
		}
		
		.ticket .inpt2{
		    width: 200px;
		    height: 26px;
		    border: 2px solid #eee;
		    line-height: 26px;
		    padding: 0px 5px;
		    margin-left: 20PX;
		}
		
		.ticket .btn{
		    border: none;
		    width: 80px;
		    height: 29px;
		    background: #80a6c4;
		    color: #fff;
		    text-align: center;
		    cursor: pointer;
		    margin-left: 7px;
		}
		
		.ticket .underline{
		    margin-left: 10px;
		    text-decoration: underline;
		    display: inline-block;
		    position: relative;
		    font-size: 12px;
			color: #878787;
		}
		
		.ticket .serviceCon{
		    width: 414px;
		    font-size: 12px;
		    color: #666666;
		    line-height: 24px;
		    border: 3px solid #ededed;
		    padding: 24px 30px;
		    background: #fff;
		    position: absolute;
		    right: -190px;
		    bottom: 40px;
		    display: none;
		}
		
		.ticket .underline:hover .serviceCon{
		    display: block;
		}
		
		.orderNote .r{
		    float: right;
		    height: 36px;
		    text-align: left;
		    line-height: 36px;
		    font-size: 12px;
		}
		
		.relief{
		    height: 48px;
		}
		
		.relief .r{
		    text-align: right;
		}
		
		.relief .p1{
		    height: 30px;
		    line-height: 20px;
		    font-size: 15px;
		}
		
		.relief .priceNo{
		    font-size: 20px;
		    color: #0c79cc;
		}
		
		.relief .origPrice{
		    color: #333;
		    text-decoration: line-through;
		    padding-top: 10px;
		    font-size: 20px;
		    font-style: italic;
		}
		
		.relief .p2{
		    color: #d20019;
		}
		
		.relief .p3{
		    height: 16px;
		    line-height: 16px;
		}
		
		.shoppingOpt{
		    text-align: center;
		    padding:20px 0px;
		}
		
		.shoppingOpt .navTle{
		    width: 100%;
		    font-size: 15px;
		    padding: 10px 0px;
		    color: #666;
		    height: 30px;
		    line-height: 30px;
		    text-align: center;
		}
		
		.shoppingOpt .payway{
		    padding: 15px 0px;
		    font-size: 18px;
		    height: 24px;
		    
		}
		
		.shoppingOpt .tips{
		    font-size: 12px;
		    color: #6393b4;
		    line-height: 30px;
		}
		
		.shoppingOpt .pay-btn{
		    width: 168px;
		    height: 30px;
		    color: #fff;
		    line-height: 30px;
		    vertical-align: middle;
		    text-align: center;
		    background: #0d3f7a;
		    margin-top: 5px;
		    border: none;
		}
	}
</style>
