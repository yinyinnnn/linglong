<template>
	<div id="Carousel">
		<el-carousel indicator-position="outside">
		    <el-carousel-item v-for="item in banner" :key="item">
		      <img :src="item" />
			  
		    </el-carousel-item>
		  </el-carousel>
	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				banner:[
					require('../assets/img/img1.jpg'),
					require('../assets/img/img2.jpg'),
					require('../assets/img/img3.jpg'),
					require('../assets/img/img4.jpg'),
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	#Carousel{
		 .el-carousel__item{
			 img{
				 width: 1000px;
				 height: 450px;
			 }

		  }
		
		
	}
</style>
