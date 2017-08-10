<template>
	<div class="seller">
		<div class="overview">
			<div class="head">
				<h1 class="title">{{seller.name}}</h1>
				<star :size="36" :score="seller.score"></star>
				<span class="ratingCount">({{seller.ratingCount}})</span>
				<span class="sellCount">月售{{seller.sellCount}}单</span>
			</div>
			<div class="heart">
				<span class="icon-favorite"></span>
				<p class="text">已收藏</p>
			</div>
			<div class="content">
				<span class="delivery">
					<h2 class="title">起送价</h2>
					<span class="text">20<span class="unit">元</span></span>
				</span>
				<span class="price">
					<h2 class="title">商家配送</h2>
					<span class="text">4<span class="unit">元</span></span>
				</span>
				<span class="time">
					<h2 class="title">平均配送</h2>
					<span class="text">39<span class="unit">分钟</span></span>
				</span>
			</div>
		</div>
		<split></split>
	</div>
</template>
<script>
import star from "@/components/star/star"
import split from "@/components/split/split"
export default{
	props: {
		seller: {
			type: Object
		}
	},
	components: {
		star,
		split
	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.seller
		position absolute
		top 183px 
		left 0
		bottom 0
		width 100%
		overflow hidden
		.overview
			position relative
			padding 18px
			.head
				border-1px(rgba(7, 17, 27, 0.1)) 
				.title
					font-size 14px
					color rgb(7, 17, 27)
					line-height 14px
					margin-bottom 8px
				.star 
					vertical-align top
					display inline-block
					margin-right 8px
					margin-bottom 18px
				.ratingCount,.sellCount
					vertical-align top
					font-size 10px
					color rgb(77, 85, 93)
					line-height 18px
					margin-right 12px
			.heart
				position absolute
				width 48px
				height 48px
				top 18px
				right 18px
				text-align center
				.icon-favorite
					font-size 24px
					color rgb(240, 20, 20)
					line-height 24px
				.text
					font-size 10px
					color rgb(77, 85, 93)
					line-height 10px
					margin-top 4px	
			.content
				display flex
				padding 18px
				font-size 0 
				.delivery,.price
					border-right 1px solid rgba(7 , 17 , 27, 0.1)	
				.delivery,.price,.time
					flex 1
					text-align center
					.title
						font-size 10px
						color rgb(147, 153, 159)
						line-height 10px
						margin-bottom 4px
					.text 
						font-size 24px
						color rgb(7, 17, 27)
						line-height 24px
						font-weight 200	
						.unit 
							font-size 10px
							color rgb(147, 153, 159)
							line-height 10px	
										
</style>