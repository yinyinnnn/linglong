<template>
	<div id="Service">
		<div class="service">
			<a href="#">
				<p class="hand"></p>
			</a>
			<div class="slogen">
				<dl class="fore1">
					<dt></dt>
					<dd>
						<p class="chinesetop">全球精品</p>
						<p class="english">Global Selections</p>
					</dd>
				</dl>
				<dl class="fore2">
					<dt></dt>
					<dd>
						<p class="chinesetop">正品保证</p>
						<p class="english">Authenticity Guaranteed</p>
					</dd>
				</dl>
				<dl class="fore3">
					<dt></dt>
					<dd>
						<p class="chinesetop">全场包邮</p>
						<p class="english">Free Delivery</p>
					</dd>
				</dl>
				<dl class="fore4">
					<dt></dt>
					<dd>
						<p class="chinesetop">400-897-6336</p>
						<p class="english">工作日 09:00-18:00</p>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	#Service{
		.service{
			padding: 51px 0 78px;
			width: 100%;
			min-width: 1000px;
			border-top: #ededed 1px solid;
			background: #fbfdfe;
			margin: 90px auto 0;
		}
		.service>a{
			display: block;
			position: relative;
			margin: 0 auto;
			padding-left: 45px;
			width: 177px;
			height: 16px;
			background: url(https://imgs-qn.iliangcang.com/images/default/icon.png?v1503) no-repeat;
			background-position: 45px -417px;
		}
		.hand{
			position: absolute;
			top: 1px;
			width: 27px;
			height: 15px;
			background-position: -173px -356px;
			overflow: hidden;
			background: url(https://imgs-qn.iliangcang.com/images/default/icon.png?v1503) no-repeat;
			background-position: -173px -356px;
		}
		.slogen{
			padding-top: 42px;
			margin: 0 auto;
			width: 1000px;
			height: 60px;
		}
		.slogen dl{
			float: left;
			height: 60px;
		}
		
		.fore1 dt{
			width: 56px;
			height: 60px;
			background: url(https://imgs-qn.iliangcang.com/images/default/icon.png?v1503) no-repeat;
			background-position: 0 -355px;
			float: left;
		}
		.fore1 dd{
			float: left;
		}
		.slogen dd{
			padding: 9px 0px 0px 20px;
			letter-spacing: 1.2px;
			word-break: break-all;
		}
		.chinesetop{
			width: 100%;
			height: 24px;
			line-height: 24px;
			overflow: hidden;
			font-size: 14px;
			color: #737373;
			text-align: left;
		}
		.english{
			line-height: 22px;
			color: #CCCCCC;
			font-size: 12px;
		}
		.fore2 dt{
			width: 45px;
			height: 60px;
			background: url(https://imgs-qn.iliangcang.com/images/default/icon.png?v1503) no-repeat;
			background-position: -153px -217px;
			float: left;
		}
		.fore2 dd{
			float: left;
		}
		.fore3 dt{
			width: 55px;
			height: 60px;
			background: url(https://imgs-qn.iliangcang.com/images/default/icon.png?v1503) no-repeat;
			background-position: -57px -353px;
			float: left;
		}
		.fore3 dd{
			float: left;
		}
		.fore1{
			width: 261px;
		}
		.fore2{
			width: 272px;
		}
		
		.fore3{
			width: 252px;
		}
		.fore4{
			width: 215px;
		}
		.fore4 dt{
			width: 57px;
			height: 60px;
			background: url(https://imgs-qn.iliangcang.com/images/default/icon.png?v1503) no-repeat;
			background-position: -114px -353px;
			float: left;
		}
		.fore4 dd{
			float: left;
		}
	}
</style>
