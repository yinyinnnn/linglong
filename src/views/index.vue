<template>
	<div id="index">
		<el-container>
		  <el-header class="header">
			 <HeaderBar></HeaderBar>
		  </el-header>
		  <el-main id="el-main">
			  <Nav></Nav>
			  <Carousel></Carousel>
			  <ImgArea></ImgArea>
			  <div class="popular">热门好书</div>
			  <div class="shopList">
				  <Book></Book>
			  </div>
			  <div class="pagers" @click="more">
			  	<div class="pagers-position">
			  		<a href="javascript:;" class="moreBtn"></a>
			  	</div>
			  </div>
			  <Service></Service>
		  </el-main>
		  <el-footer>
			  <Foot></Foot>
		  </el-footer>
		</el-container>
		<router-view></router-view>
	</div>	
</template>

<script>
	import HeaderBar from "@/components/HeaderBar.vue"
	import Nav from "@/components/Nav.vue"
	import Carousel from "@/components/Carousel.vue"
	import ImgArea from "@/components/ImgArea.vue"
	import Book from "@/components/Book.vue"
	import Service from "@/components/Service.vue"
	import Foot from "@/components/Foot.vue"
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			more(){
				this.$router.push('/goodsListPage')
			}
			
		},
		created(){
			
		},
		components:{
			HeaderBar,
			Nav,
			Carousel,
			ImgArea,
			Book,
			Service,
			Foot
		},
		
	}
</script>

<style lang="less" scoped>
	#index{
		.header{
			background-color: #0d3f7a;	
		}
		.popular{
			width: 1000px;
			height: 17px;
			padding: 10px 0px;
			margin: 36px auto 20px;
			color: #0d3f7a;
			border-bottom: 1px solid #ccc;
			text-align: center;
			font-size: 16px;
		}
		.shopList{
			width: 1000px;
			height: auto;
			margin: 20px auto;
		}
		.pagers{
			width: 1000px;
			height: 50px;
			text-align: center;
			margin: 0 auto;
		}
		.pagers-position>a{
			width: 148px;
			height: 50px;
			clear: both;
			text-align: center;
			margin-top: 60px;
			cursor: pointer;
			display: block;
			background: url(https://imgs-qn.iliangcang.com/images/default/icon.png?v1503) no-repeat;
			background-position: 0 -640px;
		}
		.pagers-position{
			height: 50px;
			width: 148px;
			display: inline-block;
		}
	}
</style>
