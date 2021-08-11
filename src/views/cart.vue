<template>
	<div id="cart">
		<el-container>
			<el-header class="header">
				<HeaderBar></HeaderBar>
			</el-header>
			<el-main id="el-main">
				<Nav></Nav>
				<CartList></CartList>
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
	import CartList from "@/components/CartList.vue"
	import Service from "@/components/Service.vue"
	import Foot from "@/components/Foot.vue"
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			test(){
				this.$router.push('/login')
			}
		},
		components:{
			HeaderBar,
			Nav,
			Foot,
			CartList,
			Service
		}
	}
	
</script>

<style lang="less" scoped>
	#cart{
		.header{
			background-color: #0d3f7a;	
		}
	}
</style>
