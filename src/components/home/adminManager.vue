<template>
	<div id="authority-user">
		
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
		  <el-breadcrumb-item>管理员信息管理</el-breadcrumb-item>
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
				<el-col :span="4">
					<el-button @click="showAddUserBtn" type="primary">添加管理员</el-button>
				</el-col>
			</el-row>
			
			<!-- 表格 -->
			<el-table :data="userList" border size="small">
				<!-- 序号索引 -->
				<el-table-column
					type="index"
					label="序号"
					width="50"
				>
					
				</el-table-column>
				<el-table-column
					prop="adminname"
					label="管理员名"
				>
				</el-table-column>	
				
				<!-- <el-table-column
					prop="password"
					label="密码"
				>
				</el-table-column> -->
				
				<el-table-column
					label="操作"
				  >
					<template v-slot="scope">
						<!-- {{scope.row}} -->
						<!-- <el-tooltip effect="dark" content="修改用户" placement="top">
							<el-button @click="updateUserBtn(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
						</el-tooltip> -->
						<el-tooltip :enterable="false" effect="dark" content="删除用户" placement="top">
							<el-button @click="deleteAdminBtn(scope.row)"  type="danger" size="mini" icon="el-icon-delete"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			
			<!-- 分页 -->
<!-- 			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page"
				:page-sizes="[1, 2, 4, 8]"
				:page-size="pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination> -->
			
		</el-card>
		
		<!-- 添加用户对话框 -->
		<el-dialog
		  title="添加管理员"
		  :visible="isShowAddUser"
		  width="50%"
			@close="isShowAddUser = false"
		  >
		  
			<el-row>
				<el-col :span="18" :offset="3">
					<!-- 添加表单 -->
					  <el-form status-icon size="small" :model="formUserAdd" ref="ruleFormRef" label-width="80px">
						
						<el-form-item label="管理员名" prop="adminname">
							<el-input v-model="formUserAdd.adminname"></el-input>
						</el-form-item>		
											
						<el-form-item label="密码" prop="password">
							<el-input show-password v-model="formUserAdd.password"></el-input>
						</el-form-item>	
						
						<el-form-item label="确认密码" prop="checkpass">
							<el-input show-password  v-model="formUserAdd.checkpass"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<!-- 底部 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="cancelAddUserBtn">取 消</el-button>
		    <el-button :disabled="AddUserDisabled" size="small" type="primary" @click="configAddUserBtn">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!-- 修改用户对话框 -->
		<!-- <el-dialog
		  title="修改用户"
		  :visible="isShowUpdateUser"
		  width="50%"
			@close="isShowUpdateUser = false"
		  > -->
		  
			<!-- <el-row>
				<el-col :span="18" :offset="3"> -->
					<!-- 修改表单 -->
					<!-- <el-form status-icon size="small" :model="formUserUpdate" :rules="formRules" ref="ruleFormRefUpdate" label-width="80px">
						
						<el-form-item label="管理员名" prop="adminname">
							<el-input v-model="formUserUpdate.adminname"></el-input>
						</el-form-item>		
						
						<el-form-item label="密码" prop="phone">
							<el-input show-password v-model="formUserUpdate.password"></el-input>
						</el-form-item>						
					</el-form>
				</el-col>
			</el-row> -->
			<!-- 底部 -->
		 <!-- <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="cancelUpdateUserBtn">取 消</el-button>
		    <el-button :disabled="AddUserDisabled" size="small" type="primary" @click="configUpdateUserBtn">确 定</el-button>
		  </span>
		</el-dialog> -->
		
	</div>

</template>

<script>
	export default {
		data(){
			//定义自定义的校验规则
			let checkPhone = (rule, value, callback) => {
				if(value == ''){
					callback(new Error('手机不能为空'));
					return;
				};
				
				let phoneReg = /^1[3456789]\d{9}$/g;
				if(!phoneReg.test(value)){
					callback(new Error('请输入正确的手机号'));
					return;
				};
				
				//验证通过,再次调用回调函数没有参数
				callback();			
			};
			let checkPass = (rule, value, callback) => {
				if(value == ''){
					callback(new Error('确认密码不能为空'));
					return;
				};
				if(value !== this.formUserAdd.password){
					callback(new Error('密码输入不一致'));
					return;
				};
				//验证通过,再次调用回调函数没有参数
				callback();				
			};
			
			return {
				//搜索框内容
				searchVal : '',
				
				//绑定分页数据
				page : 1,
				total : 34,
				pagesize : 2,
				//用户列表数据
				userList : [],				
				// 添加用户对话框
				isShowAddUser : false,				
				//按钮禁用
				AddUserDisabled : false,
				//修改用户对话框 
				isShowUpdateUser : false,
				//表单数据绑定对象
				formUserAdd:{
					adminname : '',
					password : '',
					checkpass : ''
				},
				//修改数据
				formUserUpdate:{
					adminname : '',
                    password : '',
				},
				
				formRules:{
					adminname : [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ validator : checkPhone, trigger: 'blur' }
					],
					password : [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
					],
					checkpass : [
						{ required: true, message: '请再次输入密码', trigger: 'blur' },
						{validator : checkPass, trigger : 'blur'}
					]
				}
			}
		},
		
		created() {
			this.getAdminList();
		},
		
		methods:{
			//请求数据的方法
			async getAdminList(){
				await this.axios.get('http://localhost:8090/admin_check', {
					params : {
						// page : this.page,
						// pagesize : this.pagesize,
						// keywords : this.searchVal
					},
					headers:{'content-type': 'application/json'}
				}).then(res =>{
					console.log(res);
					this.userList = res.data.data.list;
					// this.userList.forEach(item=>{
					// 	item.birthday = item.birthday.substring(0,10);
					// })
					//用户列表获取成功
					this.$message.success('用户列表获取成功');
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
					adminName:this.searchVal
				}
				await this.axios.get(
				'http://localhost:8090/admin_check',{params:params,
				headers:{'content-type': 'application/json'}}).then(res => {
					console.log(res)
					this.userList = res.data.data.list;
				}).catch(err=>{
				
				});
			},
			
			//点击清空按钮
			clearSearch(){
				this.getAdminList();
			},
			
			// 点击添加用户按钮
			async showAddUserBtn(){
				console.log(this.formUserAdd.adminname)
				//弹出添加用户对话框
				this.isShowAddUser = true;
			 },
			
			//点击添加用户取消按钮
			cancelAddUserBtn(){
				// 清空 
				console.log(this.$refs.ruleFormRef);
				this.$refs.ruleFormRef.resetFields();
				//隐藏对话框 
				this.isShowAddUser = false;
			},
			//点击添加用户确证按钮
			async configAddUserBtn(){
				
				let params = {
					adminname:this.formUserAdd.adminname,
					adminpwd:this.formUserAdd.password
				}
				let newParams = JSON.stringify(params);
				await this.axios.post('http://localhost:8090/admin_addadmin',
					newParams,
					{headers:{'content-type': 'application/json'}})
					.then(res =>{
				
					this.$message.success('成功');
					this.isShowUpdateBook = false;
					this.getAdminList();
					this.$router.go(0);
					// this.userList.forEach(item=>{
					// 	item.birthday = item.birthday.substring(0,10);
					// })
					//用户列表获取成功
				}).catch(error => {
				alert("获取失败")
				})

				
			},
			async deleteAdminBtn(obj){
				await this.axios.delete('http://localhost:8090/admin_del',
						{params:{adminId:obj.adminid},headers:{'content-type': 'application/json'}})
						.then(res =>{
							this.$message.success('成功');
							this.isShowUpdateUser = false;
							this.getAdminList();
							// this.userList.forEach(item=>{
							// 	item.birthday = item.birthday.substring(0,10);
							// })
							//用户列表获取成功
						}).catch(error => {
							alert("获取失败")
						})
			},
			
			//点击更新用户取消按钮
			cancelUpdateUserBtn(){
				//清空 
				this.$refs.ruleFormRefUpdate.resetFields();
				//隐藏对话框 
				this.isShowUpdateUser = false;
			},
			//点击更新用户确证按钮
			async configUpdateUserBtn(){
				//验证所有表单验证通过
				this.$refs.ruleFormRefUpdate.validate().then((doc) => {
					//console.log(doc);
					//禁止添加
					//this.AddUserDisabled = true;
					
					//添加用到到数据库中，添加完成之后 关闭对话框  清空表单
					setTimeout(() => {
						this.$refs.ruleFormRefUpdate.resetFields();
						this.isShowUpdateUser = false;	
						//this.AddUserDisabled = false;
					}, 1000);
					
				}).catch((err) => {
					this.$message.error('验证失败');
				});
				
			},
		}
		
	}
</script>

<style>
	#authority-user{
		
	}
	#authority-user /deep/ .el-input__inner{
			border: 1px solid #EBEEF5;
		}
	#authority-user /deep/ .el-table{
			margin-top: 40px;
		}
	#authority-user /deep/ .el-card{
			margin-top: 20px;
		}
	#authority-user /deep/ .el-pagination{
			margin-top: 20px;
		}
</style>

