<template>
	<div id="Foot">
		<div class="footer">
			<div class="wrap">
				<div class="footLeft f1">
					<div class="friendly">
						<p class="toplink">
							<a href="#"class="first">关于书苑</a>
							<a href="#">服务协议</a>
							<a href="#">隐私保护政策</a>
							<a href="#">使用指南</a>
							<a href="#">联系我们</a>
							<a href="#">加入我们</a>
							<a href="#">友情链接</a>
							<a href="#">私信书苑</a>
							<a href="javascript:;" @click="gobackstagehome">后台管理</a>
						</p>
					</div>	
				</div>
			    <div class="footRight text-r fr">
			    	<div class="commun">
						<ul>
							<li>
								<a class="douban" href="http://site.douban.com/208766/"></a>
							</li>
							<li>
								<a class="sina" href="http://weibo.com/iliangcang"></a>
							</li>
							<li>
								<a class="wechat" href="javascript:;">
									<div class="wechat-code" >
										<s></s>
									</div>
								</a>
							</li>
						</ul>
			    		
			    	</div>
			    </div>
			</div>
		</div>
		<div class="backTop">
			<a href="#" class="top"></a>
		</div>
		<div class="contact">
			<a href="">联系客服</a>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			gobackstagehome(){
				this.$router.push('/backstagelogin');
			}
		}
	}
</script>

<style lang="less" scoped>
	#Foot{
		.footer{
			width: 100%;
			height: 150px;
			min-width: 1000px;
			background: #0d3f7a;
			color: #ccc;
			border-top: #0d3f7a 1px solid;
		}
		.wrap{
			width: 1000px;
			margin: 0 auto;
		}
		.footLeft{
			width: 800px;
			padding-top: 40px;
		}
		.footLeft-a{
			width: 196px;
			height: 44px;
			display: block;
		}
		.f1{
			float: left;
		}
		.friendly{
			font-size: 12px;
			color: #ccc;
			letter-spacing: 3px;
			margin-top: 29px;
			width: 800px;
			height: 35px;
		}
		.toplink{
			height:14px;
			margin-bottom: 9px;
			
		}
		.toplink a{
			float: left;
		}
		.friendly p .first{
			padding-left: 0;
			background: none;
		}
		.friendly a{
			display: inline-block;
			height: 14px;
			line-height: 14px;
			color: #ccc;
			padding: 0 8px 0 10px;
		}
		.footRight{
			width: 200px;
			height: 75px;
			background: #0d3f7a;
		}
		.text-r{
			text-align: right;
		}
		.fr{
			float: right;
		}
		.commun{
			height: 30px;
			padding: 45px 0 0;
		}
		.commun li{
			float: right;
			height: 30px;
			margin-left: 27px;
			position: relative;
		}
		.commun li a{
			display: block;
			height: 20px;
			cursor: pointer;
		}
		.wechat:hover .wechat-code {
			display: block;
		}
		.wechat:hover{
			opacity: 1;
		}
		.right-side-code img{
			width: 100%;
			height: 100%;
			display: block;
			z-index:1;
			position: relative;
		}
		.backTop{
			height: auto;
			width: 60px;
			position: fixed;
			right: 44px;
			bottom: 44px;
			cursor: pointer;
		}
		.backTop .top{
			width: 59px;
			height: 59px;
			display: block;
			background: url(https://imgs-qn.iliangcang.com/images/default/icon.png?v1503);
			background-position: -20px -813px;
			position: relative;
			opacity: 1;
		}
		.top:hover{
			opacity: 0.2;
		}
		.contact{
			position: fixed;
			right: 28px;
			bottom: 4px;
		}
		.contact a{
			background-color: #42b8f4;
			display: block;
			color: #fff;
			width: 90px;
			height: 30px;
			line-height: 30px;
			border-radius: 4px;
			font-size: 13px;
			text-align: center;
		}
	}
</style>
