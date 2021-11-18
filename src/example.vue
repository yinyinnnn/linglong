<template>
	<div id="goodsManager">
		
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		  <el-breadcrumb-item>商品信息管理</el-breadcrumb-item>
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
					<el-button @click="showAddBookBtn" type="primary">添加图书</el-button>
				</el-col>
			</el-row>
			
			<!-- 表格 -->
			<el-table :data="bookList" border size="small">
				<!-- 序号索引 -->
				<el-table-column
					type="index"
					label="序号"
					width="50"
				>
					
				</el-table-column>
				<el-table-column
					prop="productname"
					label="商品名"
				>
				</el-table-column>	
				
				<el-table-column
					prop="price"
					label="价格"
				>
				</el-table-column>	
				<el-table-column
					prop="writer"
					label="作者"
				>
				</el-table-column>	
				
				<el-table-column
					label="操作"
				  >
					<template v-slot="scope">
						<!-- {{scope.row}} -->
						<el-tooltip effect="dark" content="修改商品" placement="top">
							<el-button @click="updateBookBtn(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
						</el-tooltip>
						<el-tooltip :enterable="false" effect="dark" content="删除商品" placement="top">
							<el-button @click="deteleBookBtn(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			
			
		</el-card>
		
		<!-- 添加商品对话框 -->
		<el-dialog
		  title="添加商品33333"
		  :visible="isShowAddBook"
		  width="50%"
			@close="isShowAddBook = false"
		  >
		  
			<el-row>
				<el-col :span="18" :offset="3">
					<!-- 添加表单 -->
					  <el-form status-icon size="small" :model="formBookAdd" :rules="formRules" ref="ruleFormRef" label-width="80px">
						
						<el-form-item label="商品名11111" prop="productname">
							<el-input v-model="formBookAdd.productname"></el-input>
						</el-form-item>		
						
						<el-form-item label="价格44444" prop="price">
							<el-input v-model="formBookAdd.price"></el-input>
						</el-form-item>						
						
						
						<el-form-item label="作者555555" prop="writer">
							<el-input  v-model="formBookAdd.writer"></el-input>
						</el-form-item>	
					</el-form>
				</el-col>
			</el-row>
			<!-- 底部 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="cancelAddBookBtn">取 消</el-button>
		    <el-button :disabled="AddBookDisabled" size="small" type="primary" @click="configAddBookBtn">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!-- 修改用户对话框 -->
		<el-dialog
		  title="修改用户"
		  :visible="isShowUpdateBook"
		  width="50%"
			@close="isShowUpdateBook = false"
		  >
		  
			<el-row>
				<el-col :span="18" :offset="3">
					<!-- 修改表单 -->
					<el-form status-icon size="small" :model="formBookUpdate" :rules="formRules" ref="ruleFormRefUpdate" label-width="80px">
						
						<el-form-item label="商品名" prop="productname">
							<el-input v-model="formBookUpdate.productname"></el-input>
						</el-form-item>		
						
						<el-form-item label="价格" prop="price">
							<el-input v-model="formBookUpdate.price"></el-input>
						</el-form-item>						
						
						<el-form-item label="作者" prop="writer">
							<el-input  v-model="formBookUpdate.writer"></el-input>
						</el-form-item>	

					</el-form>
				</el-col>
			</el-row>
			<!-- 底部 -->
		 <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="cancelUpdateBookBtn">取 消</el-button>
		    <el-button :disabled="AddBookDisabled" size="small" type="primary" @click="configUpdateUserBtn">确 定</el-button>
		  </span>
		</el-dialog>
		
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
				bookList : [

				],				
				// 添加商品对话框
				isShowAddBook : false,				
				//按钮禁用
				AddBookDisabled : false,
				//修改商品对话框 
				isShowUpdateBook : false,
				//表单数据绑定对象
				formBookAdd:{
					productid:'',
					productname : '',
					price : '',
					writer : ''
				},
				//修改数据
				formBookUpdate:{
					productid:'',
					productname : '',
					price : '',
					writer : ''
				},
				
				formRules:{
					
				}
			}
		},
		
		created() {
			this.getGoodList();
		},
		
		methods:{
			//请求数据的方法
			async getGoodList(){
				await this.axios.get('http://localhost:8090/api_goodcheck/productName', {
					params : {
						// page : this.page,
						// pagesize : this.pagesize,
						keywords : this.searchVal
					},
					headers:{'content-type': 'application/json'}
				}).then(res =>{
					console.log(res);
					this.bookList = res.data.data.list;
					// this.userList.forEach(item=>{
					// 	item.birthday = item.birthday.substring(0,10);
					// })
					//用户列表获取成功
					this.$message.success('商品列表获取成功');
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
					productName:this.searchVal
				}
				console.log(this.searchVal);
				await this.axios.get(
				'http://localhost:8090/api_goodcheck/productName',{params:params,
				headers:{'content-type': 'application/json'}}).then(res => {
					console.log(res)
					this.bookList = res.data.data.list;
				}).catch(err=>{
				
				});
			},
			
			//点击清空按钮
			clearSearch(){
				this.getGoodList();
			},
			
			// 点击添加商品按钮
			showAddBookBtn(){
				this.isShowAddBook = true;
			
			 },
			
			//点击添加用户取消按钮
			cancelAddBookBtn(){
				// 清空 
				console.log(this.$refs.ruleFormRef);
				this.$refs.ruleFormRef.resetFields();
				//隐藏对话框 
				this.isShowAddBook = false;
			},
			//点击添加用户确证按钮
			async configAddBookBtn(){
				let Addparams = {
					productname :this.formBookAdd.productname,
					price : this.formBookAdd.price,
					writer : this.formBookAdd.writer
				}
				console.log(this.formBookAdd.productname)
				console.log(this.formBookAdd.price)
				let newParams = JSON.stringify(Addparams);
				await this.axios.post('http://localhost:8090/api_booksadd', 
					newParams,
					{headers:{'content-type': 'application/json'}})
					.then(res =>{
				
					this.$message.success('成功');
					this.isShowUpdateBook = false;
					this.getGoodList();
					this.$router.go(0);
					// this.userList.forEach(item=>{
					// 	item.birthday = item.birthday.substring(0,10);
					// })
					//用户列表获取成功
				}).catch(error => {
				alert("获取失败")
				})
				
			},
			
			//修改用户按钮
			updateBookBtn(obj){
				this.isShowUpdateBook = true;
				//设置
				this.formBookUpdate.productid = obj.productid;
				this.formBookUpdate.productname = obj.productname;
				this.formBookUpdate.price = obj.price;
				this.formBookUpdate.writer = obj.writer;
			},
			
			//点击更新用户取消按钮
			cancelUpdateBookBtn(){
				//清空 
				this.$refs.ruleFormRefUpdate.resetFields();
				//隐藏对话框 
				this.isShowUpdateBook = false;
			},
			//点击更新商品确证按钮
			async configUpdateUserBtn(){
				let  params = {
					productid:this.formBookUpdate.productid,
					productname:this.formBookUpdate.productname,
					price:this.formBookUpdate.price,
					writer:this.formBookUpdate.writer,
				}
				console.log(this.formBookUpdate.productname);
				console.log(this.formBookUpdate.productid);
				let newParams = JSON.stringify(params);
				await this.axios.put('http://localhost:8090/api_booksChange', 
					newParams,
					{headers:{'content-type': 'application/json'}})
					.then(res =>{
				
					this.$message.success('成功');
					this.isShowUpdateBook = false;
					this.getGoodList();
					// this.userList.forEach(item=>{
					// 	item.birthday = item.birthday.substring(0,10);
					// })
					//用户列表获取成功
				}).catch(error => {
				alert("获取失败")
				})
			},
			//删除商品
			async deteleBookBtn(obj){
				await this.axios.delete('http://localhost:8090/api_booksDel',
						{params:{productId:obj.productid},headers:{'content-type': 'application/json'}})
						.then(res =>{

							this.$message.success('成功');
							this.isShowUpdateUser = false;
							this.getGoodList();
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
