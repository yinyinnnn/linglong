<template>
	<div id="goodsListPage">
		<el-container>
			<el-header class="header">
				<HeaderBar></HeaderBar>
			</el-header>
			<el-main id="el-main">
				<Nav></Nav>
				<div class="content">
					<goodsList></goodsList>
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
	import GoodsList from "@/components/goodsList.vue"
	import Service from "@/components/Service.vue"
	import Foot from "@/components/Foot.vue"
	export default{
		data(){
			return{
				menuId:'',
				keycheck:'',
				searchkey:''
			}
		},
		methods:{
			test(){
				this.$router.push('/login')
			}
		},
		created(){
			window.scroll({ top: 0, left: 0, });
			this.menuId = sessionStorage.getItem('menuId');
			this.keycheck = sessionStorage.getItem('keycheck');
			this.searchkey = sessionStorage.getItem('searchkey');
			console.log(this.menuId+"menuId");
			console.log(this.keycheck+"keycheck");
			console.log(this.searchkey+"searchkey");
		},
		components:{
			HeaderBar,
			Nav,
			Foot,
			GoodsList,
			Service
		}
	}
</script>

<style lang="less" scoped>
	#goodsListPage{
		.header{
			background-color: #0d3f7a;	
		}
		.content{
			width: 1000px;
			// height: 1000px;
			margin: 20px auto;
			position: relative;
		}
	}
</style>
