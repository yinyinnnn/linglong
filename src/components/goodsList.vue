<<template>
	<div id="Book">
<!-- 		<div v-if="bookList.length<=0">
			空空如也
		</div> -->
		<div class="bookimg first" v-for="item in bookList" @click="godetail(item.productname)" >
			
			<a href="javascript:;"class="img-hover">
				<img class="first-img" :src="getImgUrl(item.picture)" >
			</a>
			<a href="javascript:;" class="goodsInfo" >
				<p class="money">￥{{item.price}}</p>
				<p class="tle">{{item.productname}}</p>
			</a>
		</div>
		<!-- <div class="block">
		  <el-pagination
		    @current-change="handleCurrentChange"
		    layout="prev, pager, next"
			:page-size="pagesize"
			:current-page="page"
		    :total="50">
		  </el-pagination>
		</div> -->
	</div>
</template>

<script>
	import BaseVue from '../baseVue/baseVue.js'
	export default{
		data(){
			return{
				page : 1,
				pagesize:6,
				typeid:'',
				keycheck:'',
				searchkey:'',
				bookList :[]
			}
		},
		methods:{
			async getbookList(){
				
				let params = {
					typeId:this.typeid,
					productName:this.searchkey
				}
				await this.axios.get(
				'http://localhost:8090/api_goodcheck/productName',{params:params,
				headers:{'content-type': 'application/json'}}).then(res => {
					console.log(res)
					this.bookList = res.data.data.list;
				}).catch(err=>{

				});
			},
			godetail(productname){
				window.sessionStorage.setItem('productname',productname);
				this.$router.push('/goodsdetail');
			},
			getImgUrl(url){
			   return require("../assets" +url);
			},
			handleCurrentChange(n){
				this.page = n;
				console.log('当前页切换了' + n);
				// this.getbookList();
			},
		},
		created(){
			// this.getbookList();
			this.typeid = sessionStorage.getItem('typeid');
			this.keycheck = sessionStorage.getItem('keycheck');
			this.searchkey = sessionStorage.getItem('searchkey');
			this.getbookList();
			console.log(this.typeid);
			// console.log(this.keycheck);
			console.log(this.searchkey);
			
			BaseVue.$on('haha', (a) => {
				this.typeid = a;
				this.getbookList();
			})
		},
		
		
		mounted(){
			window.sessionStorage.removeItem('typeid');
		}
			
	}
</script>

<style lang="less" scoped>
	#Book{
		.bookimg{
			width: 316px;
			height: 316px;
			margin: 0px 8px 15px 8px;
			display: inline-block;
			position: relative;
		}
		// .first{
		// 	margin-left: 0px;
		// 	flex-direction: row;
		//     display: flex;
		// 	flex-wrap: wrap;
		// 	justify-content: space-between;
		// 	display: inline-block;
		// }
		.first-img{
			width: 316px;
			height: 316px;
			
		}
		.goodsInfo{
			width: 286px;
			height: 286px;
			padding: 15px;
			position: absolute;
			top: 0px;
			left: 0px;
			background: black;
			opacity: 0.7;
			display: none;
		}
		.goodsInfo p{
			margin: 0 auto;
			text-align: center;
			height: 25px;
			width: 85%;
			line-height: 20px;
			vertical-align: middle;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-weight: bold;
			color: #fff;
		}
		.bookimg:hover .goodsInfo{
			display: block;
		}
		.money{
			text-align: left !important;
			width: 97%;
			margin-top: 4px;
			color: #0c6eba !important;
			font-size: 20px;
			font-style: italic;
			margin-left: 0px !important;
		}
		.tle{
			margin-top: 118px !important;
			font-size: 14px;
		}
		.desc{
			font-size: 12px;
			font-weight: 100;
			margin-top: 5px;
			white-space: normal;
			height: auto;
		}
	}
</style>

