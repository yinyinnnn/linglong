<template>
	<div id="owndata">
		<div class="data">
			<el-radio-group size="small">
			  <el-radio-button label="left">设置信息</el-radio-button>
			</el-radio-group>
			<div style="margin: 20px;"></div>
			<el-form label-width="80px" :model="formLabelAlign">
			  <el-form-item label="用户名">
			    <el-input v-model="formLabelAlign.username"></el-input>
			  </el-form-item>
			  <el-form-item label="生日">
			    <el-input v-model="formLabelAlign.phone"></el-input>
			  </el-form-item>
			   <el-form-item label="性别">
			      <el-radio-group v-model="formLabelAlign.sex" size="medium">
			        <el-radio border label="男"></el-radio>
			        <el-radio border label="女"></el-radio>
			      </el-radio-group>
				</el-form-item>
				<el-form-item label="地址">
				  <el-input v-model="formLabelAlign.address"></el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" style="margin-left: 350px;margin-top: 20px;"@click="update">保存</el-button>
		</div>
	</div>
</template>

<script>
	  export default {
		data() {
		  return {
			// labelPosition: 'right',
			formLabelAlign: {
			  userid:'',
			  username: '',
			  birthday: '',
			  sex:'',
			  address:''
			}
		  };
		},
		methods:{
			async update(){
				let  params = {
						userid:this.formLabelAlign.userid,
						username:this.formLabelAlign.username,
						birthday:this.formLabelAlign.birthday,
						sex:this.formLabelAlign.sex,
						address:this.formLabelAlign.address
					}
					let newParams = JSON.stringify(params)
					console.log(params+"2")
					console.log(newParams+"3")
					await this.axios.put('http://localhost:8090/api_userInfoChange', 
						newParams,
						{headers:{'content-type': 'application/json'}})
						.then(res =>{
					
						this.$message.success('成功');
						// this.userList.forEach(item=>{
						// 	item.birthday = item.birthday.substring(0,10);
						// })
						//用户列表获取成功
					}).catch(error => {
					alert("获取失败")
				})
			}
		}
	  }
</script>

<style lang="less" scoped>
	#owndata{
		.data{
			width: 800px;
			height: 400px;
			margin-top: 40px;
			margin-left: 270px;
		}
	}
	#owndata /deep/ .el-input__inner{
		border: 1px solid #DCDFE6;
	}
</style>
