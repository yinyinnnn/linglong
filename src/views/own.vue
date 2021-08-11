<template>
	<div id="own">
		<el-container>
			<el-header class="header">
				<HeaderBar></HeaderBar>
			</el-header>
			<el-main id="el-main">
				<Nav></Nav>
				<Owndata></Owndata>
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
	import Foot from "@/components/Foot.vue"
	import Owndata from "@/components/owndata.vue"
	import Service from "@/components/Service.vue"
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
			Owndata,
			Service
		}
	}
</script>

<style lang="less" scoped>
	#own{
		.header{
			background-color: #0d3f7a;	
		}
	}
</style>
