<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<div class="head">
					<h1 class="title">{{seller.name}}</h1>
					<star :size="36" :score="seller.score"></star>
					<span class="ratingCount">({{seller.ratingCount}})</span>
					<span class="sellCount">月售{{seller.sellCount}}单</span>
				</div>
				<div class="heart" @click="toggle">
					<span :class="this.favorite ? 'icon-favorite' : ['icon-favorite-no','icon-favorite']"></span>
					<p class="text" :class="this.favorite ? '' :'icon-favorite-no-text' ">{{text}}</p>
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
			<div class="activity">
				<h1 class="title">公告与活动</h1>
				<p class="content">{{seller.bulletin}}</p>
				<ul class="list">
					<li class="list-item" v-for="(item, index) in seller.supports"><span :class="classMap[seller.supports[index].type]" class="icon"></span><span class="text">{{item.description}}</span></li>
				</ul>
			</div>
			<split></split>
			<div class="seller-pic" >
				<h1 class="title">商家实景</h1>
				<div class="pic" ref="pics">
					<ul class="picList" ref="picList">
						<li class="item" v-for="item in seller.pics"><img :src="item" width="120" height="94"></li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul class="list">
					<li v-for="info in seller.infos" class="list-item">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import star from "@/components/star/star"
import split from "@/components/split/split"
import BScroll from 'better-scroll'
export default{
	data() {
		return{
			favorite: false
		}
	},
	props: {
		seller: {
			type: Object
		}
	},
	components: {
		star,
		split
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	mounted() {
		this.$nextTick(() => {
			this._initScroll()
			this._initPics()
		})
	},
	methods: {
		toggle() {
			this.favorite = !this.favorite
		},
		_initScroll() {
			if (!this.scroll) {
	          this.scroll = new BScroll(this.$refs.seller, {
	            click: true
	          })
	        } else {
	          this.scroll.refresh();
	        }
		},
		_initPics() {
			if (this.seller.pics) {
				let picWidth = 120
				let margin = 6
				let width = (picWidth + margin) * this.seller.pics.length - margin
				this.$refs.picList.style.width = width + 'px'
				if (!this.picScroll) {
						this.$nextTick(() => {
							this.picScroll = new BScroll(this.$refs.pics,{
							scrollX: true,
							eventPassthrough: 'vertical'
						})
					})
				}
			} 
		}
	},
	watch: {
      'seller' () {
        this.$nextTick(() => {
          this._initScroll()
          this._initPics()
        });
      }
    },
    computed: {
    	text() {
    		return this.favorite ? '已收藏' : '未收藏'
    	}
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
				.icon-favorite-no
					color rgb(212, 214, 217)	
				.text
					font-size 10px
					color rgb(77, 85, 93)
					line-height 10px
					margin-top 4px
				.icon-favorite-no-text
					font-size 10px
					color rgb(212, 214, 217)
					line-height 10px
					margin-top 4px		
			.content
				display flex
				padding 18px 0
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
		.activity
			padding: 18px 18px 0 18px
			.title
				font-size 14px
				color rgb(7, 17, 27)
				line-height 14px
				margin-bottom 8px
			.content 
				font-size 12px
				font-weight 200
				line-height 24px
				color rgb(240, 20, 20)
				padding 0 12px 16px
			.list		
				.list-item
					border-top solid 1px rgba(7, 17, 27, 0.1)
					padding 16px 12px
					.icon
						display inline-block
						width 16px
						height 16px
						vertical-align: top
						margin-right: 6px
						background-size: 16px 16px
						background-repeat: no-repeat 
						&.decrease
							bg-image('decrease_4')
						&.discount
							bg-image('discount_4')
						&.special
							bg-image('special_4')
						&.invoice
							bg-image('invoice_4')
						&.guarantee
							bg-image('guarantee_4')				
					.text 
						display inline
						vertical-align top 
						font-size 12px
						font-weight 200
						color rgb(7, 17 ,27)
						line-height 16px
						margin-left 6px						
		.seller-pic				
			padding 18px
			width 100%
			white-space nowrap
			overflow hidden
			.title 
				font-size 14px
				color rgb(7, 17, 27)
				line-height 14px
				margin-bottom 12px
			.pic 
				.picList
					font-size 0
					.item
						display inline-block
						margin-right 6px
						&.last-child
							margin-right 0	
		.info
			padding: 18px 18px 0 18px
			.title					
				font-size 14px
				color rgb(7, 17, 27)
				line-height 14px
				padding-bottom 12px
			.list 
				.list-item 
					padding 16px 12px
					font-size 12px
					color rgb(7, 17, 27)
					line-height 16px
					font-weight 200
					border-top solid 1px rgba(7, 17, 27, 0.1)
						
				
</style>