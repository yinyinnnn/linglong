<template>
		<div id="HeaderBar">
			<div class="wrap">
				<div class="logo">
					<a href="index.html"></a>
				</div>
				<ul class="header-right">
					<li>
						<a class="username">{{username}}</a>
						<a @click="loginOut" class="quit" v-if="username!=null">退出</a>
						<a @click="test" class="loginBtn" v-if="username==null">登录</a>
						<a @click="registerNow" class="registerBtn" v-if="username==null">注册</a>
					</li>
					<li class="line"></li>
					<li class="black-character shop-cart">
						<a @click="gocart" class="cartBtn">购物车</a>
					</li>
					<li class="line"></li>
					<li class="black-character">
						<a @click="goown"class="ownBtn">我的</a>
					</li>
				</ul>
				</div>
			</div>
		</div>
</template>

<script>
	export default{
		data(){
			return{
				userid:'',
				username:''
			}
		},
		methods:{
			test(){
				this.$router.push('/login')
			},
			registerNow(){
				this.$router.push('./register')
			},
			gocart(){
				this.$router.push('./cart')
			},
			goown(){
				this.$router.push('./own')
			},
			loginOut(){
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('username');
				this.$router.go(0);
			}
			
		},
		created(){
			// this.userid= sessionStorage.getItem('token');
			this.username= sessionStorage.getItem('username');
			// console.log(this.userid);
			// console.log(this.username);
		}
	};
</script>

<style lang="less" scoped>
	#HeaderBar{
		.wrap{
			width: 1000px;
			margin: 0 auto;
			height: 60px;
		}
		.logo{
			background-image: url(../assets/img/logochar.png);
			background-position: 0px 0px;
			background-size: 140px 50px;
			width: 140px;
			height: 50px;
		    float: left;
			margin: 4px 0px;
		}
		.logo>a{
			width: 95px;
			height: 38px;
			display: block;
		}
		.header-right{
			width: 400px;
			height: 56px;
			float: right;
		}
		.header-right>li{
			font-size: 12px;
			line-height: 56px;
			float: left;
			margin-left: 15px;
		}
		.loginBtn,.registerBtn,.username,.quit{
			color:#ccc;
		}
		.loginBtn{
			margin-right: 8px;
		}
		.line{
			width: 1px;
			height: 8px;
			margin-top: 25px;
			background: #ccc;
			margin-left: 15px;
		}
		.username,.quit{
			margin-right: 10px;
			// display: none;
		}
		.black-character>a{
			color: #ccc;
		}
		.cart{
			position: absolute;
			top: 55px;
			background: #0d3f7a;
			z-index: 1000;
			width: 320px;
			right: 260px;
			letter-spacing: 1px;
			display: none;
		}
		.shop-cart:hover .cart{
			display: block;
		}
		.shop-nullcar{
			height: 70px;
			line-height: 70px;
			padding: 0 20px;
			font-size: 13px;
			text-align: center;
			overflow: hidden;
			color: #9d9d9d;
		}
		.shop-nullcar a{
			color: #ccc;
			cursor: text;
		}
		.car_list{
			padding: 0;
			width: 320px;
			background: none;
		}
		.add-shop{
			display: block;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background: #7dbfde;
			text-align: center;
			font-size: 14px;
			color: #fff;
		}
		.loginBtn:hover{
			cursor: pointer;
			color: #e94730;
		}
		.registerBtn:hover{
			cursor: pointer;
			color: #e94730;
		}
		.cartBtn:hover{
			cursor: pointer;
			color: #e94730;
		}
		.ownBtn:hover{
			cursor: pointer;
			color: #e94730;
		}
		.quit:hover{
			cursor: pointer;
			color: #e94730;
		}
		
	}
</style>
