<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="left">
					<span class="score">{{seller.score}}</span>
					<span class="text">综合评分</span>
					<span class="content">高于周边商家{{seller.rankRate}}%</span>
				</div>
				<div class="right">
					<div class="service-star">
						<span class="text">服务态度</span><star :size="36" :score="seller.serviceScore" class="star"></star><span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="delivery-star">
						<span class="text">商品评分</span><star :size="36" :score="seller.foodScore" class="star"></star><span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="time">
						<span class="text">送达时间</span>{{seller.deliveryTime}}分钟
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :ratings="ratings" :selectType='selectType' :onlyContent="onlyContent" :desc="desc" @select="selectRating" @toggle="toggleContent"></ratingselect>
			<div class="ratings-wrapper" v-show="ratings.length">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="no-content" v-show="!ratings.length">
				<p>暂无评论</p>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import star from '@/components/star/star'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
const ALL = 2
const ERR_OK = 0
export default{
	data (){
		return {
			onlyContent: true,
			selectType: ALL,
			desc: {
			all: '全部',
			positive: '满意',
			negative: '不满意'
			},
			ratings: []
		}
	},
	props: {
		seller: {
			type: Object
		}
	},
	components: {
		star,
		split,
		ratingselect
	},
	created() {
		this.$http.get('/api/ratings').then((res) => {
			res = res.body 
			if (res.errno == ERR_OK){
				this.ratings = res.data
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.ratings,{
						click: true
					})
				})
			}
		}).catch(() => {
			console.log('error')
		})
	},
	methods: {
		selectRating (val) {
			this.selectType = val
			this.$nextTick(() => {
        		this.scroll.refresh()
        	})
		},
		toggleContent (val) {
			this.onlyContent = !this.onlyContent
        	this.$nextTick(() => {
        		this.scroll.refresh()
        	})
		},
		needShow (type, text) {
			if (this.onlyContent&& text === '') {
				return false
			}
			if (this.selectType === ALL) {
	          return true;
	        } else {
	          return type === this.selectType;
	        }
		}
	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
	.ratings
		position absolute
		top 183px
		bottom 0
		left 0
		width 100% 
		overflow hidden
		.overview
			display flex
			padding 18px 0
			.left 
				flex 0 0 137px
				width 137px
				border-right 1px solid rgba(7 , 17 , 27, 0.1)
				text-align center
				@media only screen and (max-width: 320px)
					flex: 0 0 120px
					width: 120px
				.score
					display block 
					font-size 24px
					color rgb(255, 153, 0)
					line-height 28px
					margin-bottom 6px
				.text 
					display block 
					font-size 12px
					color rgb(7, 17, 27)
					line-height 12px
					margin-bottom 8px
				.content 
					display block 
					font-size 10px
					color rgba(7 , 17 , 27, 0.4)
					line-height 10px	
			.right
				flex 1
				padding-left 24px
				@media only screen and (max-width: 320px)
					padding-left: 6px
				.service-star,.delivery-star,.time
					font-size 0px
					line-height 18px
					color rgb(7, 17, 27)
				.service-star
					// margin-bottom 8px
					.star 
						display inline
						margin-right 12px
					.text
						font-size 12px		
						margin-right 12px
						vertical-align top
					.score
						font-size 12px
						color rgb(255, 153, 0)
						vertical-align top	
				.delivery-star
					// margin-bottom 8px
					.star 
						display inline
						margin-right 12px
					.text
						font-size 12px			
						margin-right 12px
						vertical-align top
					.score
						font-size 12px
						color rgb(255, 153, 0)
						vertical-align top					
				.time
					font-size 12px		
					color rgba(7 , 17 , 27, 0.4)
					.text
						font-size 12px		
						margin-right 12px
						color rgb(7, 17, 27)
		.ratings-wrapper
			padding 0 18px
			.rating-item
				display flex
				padding-top 18px
				.avatar
					flex 0 0 28px
					margin-right 12px
				.content 
					flex 1
					position relative
					.name 
						font-size 10px
						color rgb(7, 17, 27)
						line-height 12px
						margin-bottom 4px
					.star-wrapper
						.star
							display inline-block
							margin-right 6px
							margin-bottom 6px
						.delivery
							font-size 10px
							font-weight 200
							color rgb(147, 153, 159)
							line-height 12px	
					.text
						font-size 12px
						color rgb(7, 17, 27)
						line-height 18px
					.recommend
						.icon-thumb_up
							font-size 12px
							color rgb(0, 160, 220)
							line-height 16px
							margin-right 8px
						.item
							display inline-block
							font-size 9px 
							color rgb(147, 153, 159)
							line-height 16px
							border solid 1px rgba(7 ,17 ,27, 0.1)
							border-radius 2px	
							background-color rgb(255, 255, 255)
							padding 2px 2px
							margin-right 8px
							margin-bottom 6px
					.time 
						position absolute
						top 0
						right 0
						font-size 10px
						font-weight 200
						color rgb(147, 153, 159)
						line-height 12px
</style>