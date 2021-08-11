<template>
	<div id="Nav">
		<div class="navbar clearfix">
			<ul class="f1">
				<li id="homepage">
					<a href="index.html">首页</a>
				</li>
				<li class="subLi" v-for="item in goodsList" :key="item.typeid" @click="togoodlistpage(item.typeid)">
					<a href="javascript:;">{{item.typename}}</a>
				</li>
			</ul>
			<div class="search fr"id="search">
				<el-input
				  placeholder="请输入图书名称"
				  v-model="input"
				  clearable
				  size='small'
				  class="inputsearch"
				  >
				</el-input>
				<span class="icon" @click="tosearch">&#xe60b;</span>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseVue from '../baseVue/baseVue.js'
	export default{
		data(){
			return{
				input:'像鸟一样飞向你的山',
				typeid:'',
				goodsList:[
					// {
					// 	menuid:1,
					// 	menuname:'文学艺术'
						
					// },
					// {
					// 	menuid:2,
					// 	menuname:'少儿童书'
						
					// },
					// {
					// 	menuid:3,
					// 	menuname:'科技教育'
						
					// },
					// {
					// 	menuid:4,
					// 	menuname:'经管励志'
						
					// },
				]
			}
		},
		methods:{
			async getgoodsList(){
				let params1 ={
					typeId:this.typeid,
				}
				await this.axios.get('http://localhost:8090/api_searchtype',params1,
				{headers:{'content-type': 'application/json'}
				}).then(res => {
					// console.log(res);
					this.goodsList = res.data.data;
				}).catch(err=>{
				
				});
			},
			
			togoodlistpage(typeid){
				window.sessionStorage.setItem('typeid',typeid);
				sessionStorage.setItem('keycheck','1');
				this.$router.push('/goodsListPage');
				console.log(typeid);
				
				BaseVue.$emit('haha', typeid)
				
			},
			async tosearch(){
				if(this.input == ''){
					alert("请输入图书名称");
					return
				}
				let params = {
						productName:this.searchkey,
						page : 1,
						pageSize : 2,
					}
				await this.axios.get('http://localhost:8090/api_goodcheck/productName',params,
				{headers:{'content-type': 'application/json'}}).then(res => {
					console.log(res);
					this.bookList = res.data.data.list;
				}).catch(err=>{
				
				});
				window.sessionStorage.setItem('typeid',this.typeid);
				window.sessionStorage.setItem('searchkey',this.input);
				window.sessionStorage.setItem('keycheck','0');
				this.$router.push('/goodsListPage');
				this.$router.go(0);
			}

		},
		created(){
			this.getgoodsList()
		}
	}
</script>

<style lang="less" scoped>
	#Nav{
		.navbar{
			width: 1000px;
			margin: 0 auto;
			position: relative;
			z-index: 9;
			height: 45px;
			background: #fff;
			display: block;
		}
		.clearfix::before{
			content: "";
			display: block;
			height: 0;
			clear: both;
			visibility: hidden;
		}
		.navbar ul{
			width: 730px;
			height: 49px;
		}
		.f1{
			float: left;
		}
		.navbar>ul>li{
			float: left;
			height: 45px;
			width: 146px;
			line-height: 46px;
			cursor: pointer;
		}
		.navbar>ul>li>a{
			display: block;
			height: 45px;
			line-height: 46px;
			color: #0D3F7A;
			font-size: 15px;
			text-align: center;
			border-bottom: 4px solid #ededed;
		}
		.navbar>ul>li>a:hover{
			border-bottom: 4px solid #0D3F7A;
		}
		
		.search{
			width: 260px;
			height: 45px;
			border-bottom: 4px solid #ededed;
			display: inline-block;
			float: left;
		}
		.search>input{
			border: none;
			outline: none;
			width: 195px;
			height: 35px;
		    margin-top: 9px;
		}
		.search>a{
			position: absolute;
			top: 3px;
			left: 954px;
			width: 33px;
			height: 40px;
			z-index: 9;
			background-position: -167px -145px;
			background-color: #fff;
		}
		@font-face {
		  font-family: 'iconfont';  /* project id 2426462 */
		  src: url('//at.alicdn.com/t/font_2426462_jrhxqyljjg.eot');
		  src: url('//at.alicdn.com/t/font_2426462_jrhxqyljjg.eot?#iefix') format('embedded-opentype'),
		  url('//at.alicdn.com/t/font_2426462_jrhxqyljjg.woff2') format('woff2'),
		  url('//at.alicdn.com/t/font_2426462_jrhxqyljjg.woff') format('woff'),
		  url('//at.alicdn.com/t/font_2426462_jrhxqyljjg.ttf') format('truetype'),
		  url('//at.alicdn.com/t/font_2426462_jrhxqyljjg.svg#iconfont') format('svg');
		}
		.icon{
			font-family:"iconfont" !important;
			font-size:20px;
			font-style:normal;
			cursor: pointer;
		}
		.inputsearch{
			line-height: 51px;
			width: 220px;
		}

		
	}
</style>
