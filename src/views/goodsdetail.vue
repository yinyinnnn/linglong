<template>
	<div id="goodsdetail">
		<el-container>
			<el-header class="header">
				<HeaderBar></HeaderBar>
			</el-header>
			<el-main id="el-main">
				<Nav></Nav>
				<Detail></Detail>
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
	import Detail from "@/components/Detail.vue"
	import Foot from "@/components/Foot.vue"
	import Service from "@/components/Service.vue"
	export default{
		data(){
			return{
				
			}
		},
		created(){
			window.scroll({ top: 0, left: 0, });
		},
		methods:{
			
		},
		components:{
			HeaderBar,
			Nav,
			Detail,
			Foot,
			Service
			
		}
	}
</script>

<style lang="less"scoped>
	#goodsdetail{
		.header{
			background-color: #0d3f7a;	
		}
	}
</style>
