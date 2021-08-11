<template>
	<div id="ImgArea">
		<div class="item">
		 	<div class="item1 p1" @click="togoodsinfo('100')">
				<img src="../assets/img/im5.jpg" />
		 	</div>
			<div class="item2" @click="togoodsinfo('101')">
				<img src="../assets/img/img7.jpg" />
			</div>
			 <div class="item1 p2" @click="togoodsinfo('102')">
			    <img src="../assets/img/img6.jpg" />
			</div>
			<div class="item1 p3"  @click="togoodsinfo('6')">
				<img src="../assets/img/img8.jpg"/>
			</div>
			<div class="item1 p4"  @click="togoodsinfo('104')">
				<img src="../assets/img/img9.png"/>
			</div>
		</div>
		<img />
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			togoodsinfo(productid){
				sessionStorage.setItem('productid',productid);
				this.$router.push('/goodsdetail');
			}
		}
	}
</script>

<style lang="less" scoped>
	#ImgArea{
		.item{
			width: 1000px;
			height: 403px;
			margin: 12px auto 0px;
			position: relative;
		}
		.item1{
			width: 317px;
			height: 190px;
			position: absolute;
		}
		.item1 img{
			width: 317px;
			height: 190px;
		}
		.item2{
			width: 318px;
			height: 403px;
			position: absolute;
			left: 340px;
			top: 0px;
		}
		.item2 img{
			width: 318px;
			height: 403px;
		}
		.p1{
			top:0px;
			left: 0px;
		}
		.p2{
			top: 0px;
			right: 0px;
		}
		.p3{
			bottom: 0px;
			left: 0px;
		}
		.p4{
			bottom: 0px;
			right: 0px;
		}
	}
</style>
