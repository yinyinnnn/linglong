<template>
	<div id="goodsManager">
		
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
		  <el-breadcrumb-item>订单信息管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!-- 卡片 -->
		<el-card>
			<!-- 搜索框 -->
			<el-row :gutter="20">
				<el-col :span="8">
					<!-- 搜索框 -->
					<el-input @clear="clearSearch" clearable placeholder="请输入内容" v-model="searchVal">
						<el-button @click="searchBtn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
			</el-row>
			
			<!-- 表格 -->
			<el-table :data="OrderList" border size="small">
				<!-- 序号索引 -->
				<el-table-column
					type="index"
					label="序号"
					width="50"
				>
					
				</el-table-column>
				<el-table-column
					prop="orderid"
					label="订单编号"
				>
				</el-table-column>	
				
				<el-table-column
					prop="userid"
					label="用户编号"
				>
				</el-table-column>	
				<el-table-column
					prop="date"
					label="日期"
				>
				</el-table-column>	
				
				<el-table-column
					label="操作"
				  >
					<template v-slot="scope">
						<el-tooltip :enterable="false" effect="dark" content="删除" placement="top">
							<el-button @click="deletOrderBtn(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			
			
		</el-card>

		
	</div>

</template>

<script>
	export default {
		data(){
			return {
				//搜索框内容
				searchVal : '',
				
				//绑定分页数据
				page : 1,
				total : 34,
				pagesize : 2,
				//用户列表数据
				OrderList : [],								
				//按钮禁用
				AddUserDisabled : false,
				//修改用户对话框 
				isShowUpdateUser : false,
				//修改数据
				formUserUpdate:{
					orderid:'',
					userid:'',
					date:''
				},
				
				formRules:{
					
				}
			}
		},
		
		created() {
			this.getOrderList();
		},
		
		methods:{
			//请求数据的方法
			async getOrderList(){
				await this.axios.get('http://localhost:8090/admin_orderCheckAll', {
					params : {
						// page : this.page,
						// pagesize : this.pagesize,
						// keywords : this.searchVal
					},
					headers:{'content-type': 'application/json'}
				}).then(res =>{
					console.log(res);
					this.OrderList = res.data.data.list;
					// this.userList.forEach(item=>{
					// 	item.birthday = item.birthday.substring(0,10);
					// })
					//用户列表获取成功
					this.$message.success('订单列表获取成功');
				});
			},
			
			handleSizeChange(n){
				// this.pagesize = n;
				// //console.log('当个数切换了' + n)
				// this.getUserList();
			},
			
			handleCurrentChange(n){
				// this.page = n;
				// //console.log('当前页切换了' + n);
				// this.getUserList();
			},
			
			//点击搜索按钮事件
			async searchBtn(){
				let params = {
					orderId:this.searchVal
				}
				console.log(this.searchVal)
				await this.axios.get(
				'http://localhost:8090/admin_orderCheck',{params:params,
				headers:{'content-type': 'application/json'}}).then(res => {
					console.log(res)
					this.OrderList = res.data.data;
				}).catch(err=>{
				
				});
				
			},
			
			//点击清空按钮
			clearSearch(){
				this.getOrderList();
			},
			
			// 点击添加订单按钮
			showAddUserBtn(){
				//弹出添加订单对话框
				this.isShowAddUser = true;
			 },
			
			//点击添加订单取消按钮
			cancelAddUserBtn(){
				// 清空 
				console.log(this.$refs.ruleFormRef);
				this.$refs.ruleFormRef.resetFields();
				//隐藏对话框 
				this.isShowAddUser = false;
			},
			//点击添加订单确证按钮
			async configAddUserBtn(){
				
			},
			async deletOrderBtn(obj){
				await this.axios.delete('http://localhost:8090/admin_orderDelete',
						{params:{orderId:obj.orderid},headers:{'content-type': 'application/json'}})
						.then(res =>{
							this.$message.success('成功');
							this.isShowUpdateUser = false;
							this.getOrderList();
							// this.userList.forEach(item=>{
							// 	item.birthday = item.birthday.substring(0,10);
							// })
							//用户列表获取成功
						}).catch(error => {
							alert("获取失败111")
						})
			}
		}
		
	}
</script>

<style>
	#goodsManager /deep/ .el-input__inner{
			border: 1px solid #EBEEF5;
		}
	#goodsManager /deep/ .el-table{
			margin-top: 40px;
		}
	#goodsManager /deep/ .el-card{
			margin-top: 20px;
		}
	#goodsManager /deep/ .el-pagination{
			margin-top: 20px;
		}
</style>

