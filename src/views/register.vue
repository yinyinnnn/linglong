<template>
	<div id="register">
		<div class="register">
			<div class="logo">
				 <el-image :src="logoSrc"></el-image>
			</div>
			
			<!-- 表单 -->
			<el-form :model="modelForm" :rules="rules" label-width="90px" class="form" ref="refLogin" >
				<el-form-item label="用户名" prop="username">
				<el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="modelForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="modelForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="password">
					<el-input v-model="modelForm.compwd" prefix-icon="el-icon-lock" placeholder="请再次输入密码" show-password></el-input>
				</el-form-item>
				
				<el-form-item class="login-btn-content">
					<el-button class="loginBtn"@click="regNow" >注册</el-button>
					<el-button class="cancleBtn" >取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return  {
				logoSrc:require('../assets/img/logo.png'),
				modelForm:{
					username:'',
					password:'',
					compwd:''
				},
				rules :{
					username:[
						{required: true,message:'请输入用户名',trigger:'blur'},
						{ min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur' }
					],
					password:[
						{required: true,message:'请输入密码',trigger:'blur'},
						{ min: 6, max: 12, message: '密码长度必须为6~12位', trigger: 'blur' }
					],
					compwd:[
						{required: true,message:'请再次输入密码',trigger:'blur'},
						{ min: 6, max: 12, message: '密码长度必须为6~12位', trigger: 'blur' }
					]
				}
				
			
			}
		},
		methods:{
			async regNow(){ 
				var params2 ={
					username: this.modelForm.username,
					password: this.modelForm.password,
				}
				var params = JSON.stringify(params2)
				await this.axios.post('http://localhost:8090/api_register',params,{
					headers:{'content-type': 'application/json'}})	
					.then(res => {
						console.log(res)
						if(res.data.resultCode === '100001'){
							this.$message.error('该用户已存在')
						}else{
							this.$message.success('注册成功')
							this.$router.push('/login');
						}
					})
					
				
			
				
			}
		}
	}
</script>

<style lang="less"scoped>
	#register{
		width: 100%;
		height: 100%;
		background-image: url(../assets/img/loginbackground.jpg);
		background-size: 100% 100%;
		position: relative;
		
		.register{
			width: 440px;
			height: 300px;
			background-color: #f8f8f8;
			opacity: .8;
			border-radius: 10px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			padding: 70px 30px 0px;
			
			.logo{
				width: 80px;
				height: 80px;
				position: absolute;
				left: 50%;
				top: 10px;
				transform: translateX(-40px);
			}
			.form{
				margin-top: 30px;
			}
			.loginBtn{
				color: white;
				margin-left: 40px;
				margin-top: 15px;
				background-color: #e5533e;
			}
			.cancleBtn{
				color: white;
				margin-left: 80px;
				margin-top: 15px;
				background-color: #e5533e;
			}

			
		}
	}
</style>

