<template>
	<div id="home">
		<el-container>
			<!-- 头部 -->
			<el-header>
				<!-- logo -->
				<h1>后台管理系统</h1>
				<!-- 退出按钮 -->
				<div class="loginout">
					<span>{{getAdminname}}</span>
					<el-button @click="loginOut" type="danger" size="small">退出</el-button>
				</div>
			</el-header>
			<!-- 左边和右边 -->
			<el-container>
				<el-aside :width="isCollapse ? '64px' : '260px'">
					<!-- 折叠按钮 -->
					<div @click="isCollapse = !isCollapse" class="collapse-btn">
						<i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
					</div>
					
					<el-menu
						background-color="#0d3f7a"
						text-color="#f7f7f7"
						router
						:collapse="isCollapse"
						unique-opened
						:collapse-transition="false"
						active-text-color="#FF4500"
						:default-active="defaultActive"
					>
						<!-- 二级菜单 -->
						<el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''">
							<!-- 标题 -->
							<template slot="title">
								<i :class="item.iconClass"></i>
								<span v-cloak>{{item.menuName}}</span>
							</template>
							
							<el-menu-item 
								v-for="subItem in item.children"
								:key="subItem.subId" 
								:index="subItem.path"
								@click="defaultActiveHandle(subItem.path)"
							>
							
								<i :class="item.iconClass"></i>
								<span>{{subItem.submenuName}}</span>
							</el-menu-item>			
						</el-submenu>
						
					</el-menu>								
				</el-aside>
				
				<!-- 右边 -->
				<el-main>
					<!-- 路由渲染 -->
					<router-view></router-view>
				</el-main>
			</el-container>
			
			
		</el-container>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				//折叠菜单
				isCollapse : false,
				//当前激活菜单项
				defaultActive : '',
				//把这个数据写一个后台接口请求
				menuList : [
					{
						id:1,
						iconClass:'el-icon-user',
						menuName:'用户管理',
						children:[
							{
								subId:'1',
								path:'/authorityUser',
								submenuName:'用户信息管理',
							}
						]
					},
					{
						id:2,
						iconClass:'el-icon-copy-document',
						menuName:'商品管理',
						children:[
							{
								subId:'1',
								path:'/goodsManager',
								submenuName:'商品信息管理'
							}
						]
					},
					{
						id:3,
						iconClass:'el-icon-shopping-bag-2',
						menuName:'订单管理',
						children:[
							{
								subId:'1',
								path:'/orderManager',
								submenuName:'订单信息管理'
							}
						]
					},
					{
						id:4,
						iconClass:'el-icon-notebook-2',
						menuName:'管理员管理',
						children:[
							{
								subId:'1',
								path:'/adminMagager',
								submenuName:'管理员信息管理'
							}
						]
					}
				],
			}
		},
		
		created() {
			//发起请求数据,得到数据后要对store数据进行修改
			//不能直接修改state, 触发mutations
			
			//触发一个vuex中的actions异步的请求
			// this.$store.dispatch('getSystemMenuList');
			console.log(this.menuList);
			
		},
		
		mounted() {
			this.defaultActive = window.sessionStorage.getItem('active');
		},
		
		computed:{
			//获取本地存储的用户名 
			getAdminname(){
				return window.sessionStorage.getItem('adminname');
			},			
		},
		
		methods:{
			//点击退出按钮
			loginOut(){
				//清除本地存储
				window.sessionStorage.removeItem('token');
				window.sessionStorage.removeItem('adminname');
				//路由跳转到登录
				this.$router.push({'path' : '/backstagelogin'});
			},
			
			//切换当前项
			defaultActiveHandle(active){
				//存到本地
				window.sessionStorage.setItem('active', active);
				console.log(active);
			}
		}
		
	}
</script>

<style lang="less" scoped>
	#home{
		width:100%;
		height: 100%;
		
		.el-container{
			height: 100%;
		}
		
		.el-header{
			color: #f7f7f7;
			background-color: #0d3f7a;
			display:flex;
			justify-content: space-between;
			align-items: center;
			
			.loginout span{margin-right: 20px;}
		}
		
		.el-aside{
			background-color: #0d3f7a;
			// 设置宽度的过渡效果
			transition: 0.3s;
			
			.collapse-btn{
				font-size: 18px;
				color: #fff;
				text-align: center;
				line-height: 30px;
				background-color: #727179;
				cursor: pointer;
			}
		}
		.el-main{
			background-color: #f1f1f1;
		}
	}
</style>
