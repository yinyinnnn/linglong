<template>
	<div id="backstagelogin">
		<div class="backstagelogin">
			<div class="logo">
				<el-image style="width:40px;height:40px" :src="logoSrc">
				</el-image>
			</div>
			
			<el-form :model="loginForm" label-width="70px" :rules="rules" ref="refLogin">
				<!-- 用户框 -->
				<el-form-item label="用户名" prop="adminname">
					<el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.adminname"></el-input>
				</el-form-item>
				<!-- 密码框 -->
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginForm.password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
				</el-form-item>
				
				<!-- 按钮 -->
				<el-form-item class="login-btn-content">
					<el-button @click="loginBtn" type="success" size="small"class="logbtn">登录</el-button>
					<el-button type="danger" size="small">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			//console.log(this.axios)
			//console.log(this.axios.get)
		},
		data(){
			return {
				logoSrc : require('../assets/img/logo.png'),
				loginForm : {
					adminname : '', 
					password : '',
				},
				
				rules : {
					adminname : [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 11, max: 11, message: '长度在 3 到 12 个字符', trigger: 'blur' }
					],
					password : [
						{required: true, message: '请输入密码', trigger: 'blur'}
					]
				}
			}
		},
		
		methods:{
		  async loginBtn(){
			  // if(this.adminname ==''){
				 //  return
			  // }else(this.password ==''){
				 //  return
			  // }
			    var params1 ={
					 adminname: this.loginForm.adminname,
					 password: this.loginForm.password,
				}
			    var params = JSON.stringify(params1)
			    await this.axios.post('http://localhost:8090/admin_login',params,{
					 headers:{'content-type': 'application/json'}})
					 .then(res => {
						 console.log(res.data)
						 if(res.data.resultCode === '100008'){
							 // alert('该用户不存在')
							 this.$message.error('该管理员不存在')
						 }else if(res.data.resultCode === '100003') {
							this.$message.error('密码错误')
						 }else{
							 window.sessionStorage.setItem('adminname', this.loginForm.adminname);
							 this.$router.push('/backstagehome'); 
						 }
			
					 })
					
				
			}
		}
	
	}
</script>

<style lang="less" scoped>
	@baseColor:#0D3F7A;
	#backstagelogin{
		width: 100%;
		height: 100%;
		background-color: @baseColor;
		position: relative;
		.backstagelogin{
			width: 340px;
			height: 180px;
			background-color:#fff ;
			box-shadow: 0px 0px 10px #fff;
			border-radius: 10px;
			position: absolute;
			left: 50%;top: 50%;
			transform: translate(-50%,-50%);
			padding: 70px 30px 0px;
			.logo{
				width:80px;
				height: 60px;
				border-radius: 50%;
				background-color: #fff;
				box-shadow: 0px 0px 20px #fff;
				position: absolute;
				left: 50%; top:-40px;
				transform: translateX(-40px);
				background-color: yellow;
				text-align: center;
				padding-top:20px
			}
			
			.logbtn{
				// text-align: right;
				margin-right: 40px;
			}
		}
	}
</style>
