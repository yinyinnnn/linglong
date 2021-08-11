'<template>
	<div id="login">
		<div class="login">
			<div class="logo">
				 <el-image :src="logoSrc"></el-image>
			</div>
			
			<!-- 表单 -->
			<el-form :model="loginForm" :rules="rules" label-width="70px" class="form" ref="refLogin" >
				<el-form-item label="用户名" prop="username">
				<el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				
				<el-form-item class="login-btn-content">
					<el-button class="loginBtn"@click="loginNow" >登录</el-button>
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
				loginForm:{
					username:'',
					password:''
				},
				rules:{
					username:[
						{required: true,message:'请输入手机号',trigger:'blur'},
						{ min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
					],
					password:[
						{required: true,message:'请输入密码',trigger:'blur'},
						{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
					]
				}
				
			
			}
		},
		methods:{
			async loginNow(){
				// this.$refs.refLogin.validate(async (isOk) => {
				// 	//验证
				// 	if(!isOk) return;
				
				// 	//发起ajax请求 
				
				 var params1 ={
					 username: this.loginForm.username,
					 password: this.loginForm.password,
				 }
				 var params = JSON.stringify(params1)
				 await this.axios.post('http://localhost:8090/api_login',params,{
					 headers:{'content-type': 'application/json'}})
					 .then(res => {
						 console.log(res.data)
						 if(res.data.resultCode === '100002'){
							 // alert('该用户不存在')
							 this.$message.error('该用户不存在')
						 }else if(res.data.resultCode === '100003') {
							this.$message.error('用户密码错误')
						 }else{
							 window.sessionStorage.setItem('address', res.data.data.address); 
							 window.sessionStorage.setItem('userid', res.data.data.userid); 
							 window.sessionStorage.setItem('username', this.loginForm.username);
							 console.log(res.data.data.address)
							 this.$router.push('/index'); 
						 }
						// if(res.data.resultCode === '000000'){
						//    alert("登录成功")
						// }else{
						// 	// //  window.sessionStorage.setItem('username', this.loginForm.username);
						// 	// //  this.$router.push('/index');
						//   }
					 })
				     // this.axios.post(`api_login`, this.qs.stringify({
				     // 		username: this.loginForm.username, 
				     // 		password: this.loginForm.password,
				     // 	})).then(res=>console.log(res)).catch(err=>console.log(err));
					// this.$message.success('登录成功');
					//把登录状写在localStorage
					// window.sessionStorage.setItem('token', this.loginForm.userid);
					
				 // });

				
			}
		}
	}
</script>

<style lang="less"scoped>
	#login{
		width: 100%;
		height: 100%;
		background-image: url(../assets/img/loginbackground.jpg);
		background-size: 100% 100%;
		position: relative;
		
		.login{
			width: 440px;
			height: 230px;
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
