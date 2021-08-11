<template>
	<div id="authority-user">
		
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/backstagehome' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>用户信息管理</el-breadcrumb-item>
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
<!-- 				<el-col :span="4">
					<el-button @click="showAddUserBtn" type="primary">添加用户</el-button>
				</el-col> -->
			</el-row>
			
			<!-- 表格 -->
			<el-table :data="userList" border size="small">
				<!-- 序号索引 -->
				<el-table-column type="index" label="序号" width="50"></el-table-column>	
					
				<el-table-column prop="username" label="用户名" ></el-table-column>
				
				<el-table-column prop="sex" label="性别" ></el-table-column>	
				
				<el-table-column prop="address" label="地址" ></el-table-column>
				
				<el-table-column prop="birthday" label="生日" ></el-table-column>	
				
				<el-table-column label="操作">
					<template v-slot="scope">
						<el-tooltip effect="dark" content="修改用户" placement="top">
							<el-button @click="updateUserBtn(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
						</el-tooltip>
						<el-tooltip :enterable="false" effect="dark" content="删除用户" placement="top">
							<el-button @click="deleteUserBtn(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			
			<!-- 分页 -->
			<!-- <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page"
				:page-sizes="[1, 2, 4, 8]"
				:page-size="pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination> -->
			
		</el-card>
		  
		
		
		<!-- 修改用户对话框 -->
		<el-dialog title="修改用户" :visible="isShowUpdateUser" width="50%" @close="isShowUpdateUser = false">
			<el-row>
				<el-col :span="18" :offset="3">
					<!-- 修改表单 -->
					<el-form status-icon size="small" :model="formUserUpdate" :rules="formRules" ref="ruleFormRefUpdate" label-width="80px">
						
						<el-form-item label="用户名" prop="username">
							<el-input v-model="formUserUpdate.username"></el-input>
						</el-form-item>
						
						<el-form-item label="生日" prop="birthday">
							<el-input v-model="formUserUpdate.birthday"></el-input>
						</el-form-item>
						
						<el-form-item label="性别" prop="sex">
							<el-input v-model="formUserUpdate.sex"></el-input>
						</el-form-item>
						
						<el-form-item label="地址" prop="address">
							<el-input v-model="formUserUpdate.address"></el-input>
						</el-form-item>
						
					</el-form>
				</el-col>
			</el-row>
			<!-- 底部 -->
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="cancelUpdateUserBtn">取 消</el-button>
				<el-button :disabled="AddUserDisabled" size="small" type="primary" @click="configUpdateUserBtn">确 定</el-button>
			</span>
		</el-dialog>
		
	</div>

</template>

<script>
	export default {
		data(){
			//定义自定义的校验规则
			// let checkPhone = (rule, value, callback) => {
			// 	if(value == ''){
			// 		callback(new Error('手机不能为空'));
			// 		return;
			// 	};
				
			// 	let phoneReg = /^1[3456789]\d{9}$/g;
			// 	if(!phoneReg.test(value)){
			// 		callback(new Error('请输入正确的手机号'));
			// 		return;
			// 	};
				
			// 	//验证通过,再次调用回调函数没有参数
			// 	callback();			
			// };
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
				isShowUpdateUser : false,
				AddUserDisabled :false,
				//修改数据
				formUserUpdate:{
					userid:'',
					username : '',
					birthday : '',
					sex:'',
					address:''
					
				},
				
				formRules:{
					username : [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min:11 , max: 11, message: '长度为11个字符', trigger: 'blur' }
					],
					// phone : [
					// 	{ required: true, message: '请输入手机号', trigger: 'blur' },
					// 	{validator : checkPhone, trigger : 'blur'}
					// ],
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
			this.getUserList();
		},
		
		methods:{
			//请求数据的方法
			async getUserList(){
				 await this.axios.get('http://localhost:8090/api_usercheck', {
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
				console.log('当个数切换了' + n)
				// this.getUserList();
			},
			handleCurrentChange(n){
				// this.page = n;
				console.log('当前页切换了' + n);
				// this.getUserList();
			},
			//点击搜索按钮事件
			async searchBtn(){
				let params = {
					userName:this.searchVal
				}
				console.log(this.searchVal)
				await this.axios.get(
				'http://localhost:8090/api_usercheck',{params:params,
				headers:{'content-type': 'application/json'}}).then(res => {
					console.log(res)
					this.userList = res.data.data.list;
				}).catch(err=>{
				
				});
			},
			//点击清空按钮
			clearSearch(){
				this.getUserList();
			},
			//修改用户按钮
			updateUserBtn(obj){
				let userid = obj.userid;
				//弹出修改框
				this.isShowUpdateUser = true;
				//数据反写
				this.formUserUpdate.username = obj.username;
				this.formUserUpdate.address = obj.address;
				this.formUserUpdate.sex = obj.sex;
				this.formUserUpdate.birthday = obj.birthday;
				this.formUserUpdate.userid = userid;
			},
			//删除用户按钮
			async deleteUserBtn(obj){
				await this.axios.delete('http://localhost:8090/api_userDel',
						{params:{userId:obj.userid},headers:{'content-type': 'application/json'}})
						.then(res =>{

							this.$message.success('成功');
							this.isShowUpdateUser = false;
							this.getUserList();
							// this.userList.forEach(item=>{
							// 	item.birthday = item.birthday.substring(0,10);
							// })
							//用户列表获取成功
						}).catch(error => {
							alert("获取失败")
						})
			},

			//点击修改用户取消按钮
			cancelUpdateUserBtn(){
				//清空 
				this.$refs.ruleFormRefUpdate.resetFields();
				//隐藏对话框 
				this.isShowUpdateUser = false;
			},
			//点击修改用户确证按钮
			async configUpdateUserBtn(){
				let  params = {
					userid:this.formUserUpdate.userid,
					username:this.formUserUpdate.username,
					birthday:this.formUserUpdate.birthday,
					sex:this.formUserUpdate.sex,
					address:this.formUserUpdate.address
				}
				let newParams = JSON.stringify(params)
				console.log(params+"2")
				console.log(newParams+"3")
				await this.axios.put('http://localhost:8090/api_userInfoChange', 
					newParams,
					{headers:{'content-type': 'application/json'}})
					.then(res =>{
				
					this.$message.success('成功');
					this.isShowUpdateUser = false;
					this.getUserList();
					// this.userList.forEach(item=>{
					// 	item.birthday = item.birthday.substring(0,10);
					// })
					//用户列表获取成功
				}).catch(error => {
				alert("获取失败")
			})
				
					
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
