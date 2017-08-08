<template>
	<div class="goods"> 
		<div class="menu-wrapper" ref="menu-wrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex === index}">
					<span class="text border-1px">
						<span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @add="addFood" :food="food" @con="conf"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></shopcart>
		<food :food="selectedFood" ref="food" @add="addFood"></food>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcart from '@/components/shopcart/shopcart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import food from '@/components/food/food'
const ERR_OK = 0;
export default{
	props:{
		seller:{
			type: Object
		}
	},
	data(){
		return {
			goods: [],
			listHeight: [],
			scrollY: 0,
			selectedFood: {}
		}
	},
	created(){
		this.classMap = ['decrease','discount','special','invoice','guarantee'];
		this.$http.get('/api/goods').then((res) => {
			res = res.body 
			if(res.errno == ERR_OK){
				this.goods = res.data
				this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
			}
		})
	},
	computed: {
		currentIndex() {
			for(let i = 0; i < this.listHeight.length; i++){
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i + 1];
				if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
					return i
				}
			}
				return 0
		},
		selectFoods() {
			let foods = []
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if(food.count > 0){
						foods.push(food)
					}
				})
			})
			return foods
		} 
	},
	methods:{
		conf() {
			console.log('con触发')
		},
		selectFood(food,event) {
			// 在点击时,传 $event变量,Better-scroll插件中的 event事件和原生 js的 event有属性上得区别,Better-scroll插件派发的事件时event_constructed为true,原生点击事件是没有这个属性的
			if (!event._constructed) {//如果不存在这个属性,则不执行下面的函数
				return
			}
			this.selectedFood = food
			this.$refs.food.show()
		},
		addFood(el) {
			// console.log(el)
			this._drop(el)
			this.$on('addFood',function(){
				console.log('123')
			})
		},
		_drop(target) {
			// this.$refs.shopcart.drop(target)
			// 异步优化 异步加载动画
			this.$nextTick(() => {
	        	this.$refs.shopcart.drop(target);
	        });
		},
		_initScroll() {
			this.foodScroll = new BScroll(this.$refs['foods-wrapper'],{
				probeType: 3,
				click: true

			})
			this.menuScroll = new BScroll(this.$refs['menu-wrapper'],{
				click: true
			})
			// console.log(this.menuScroll)
			this.foodScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y))
			})
		},
		_calculateHeight() {
			let height = 0
			let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
			this.listHeight.push(height)
			for(let i = 0;i<foodList.length;i++){
				let item = foodList[i]
				height += item.clientHeight
				this.listHeight.push(height)
			}
		}
	},
	mounted() {
		this.$on('con-test',function(msg){console.log("'监听到conf，拿到参数'+'msg'")})
		this.$emit('con-test','成功')

	},
	components:{
		shopcart,
		cartcontrol,
		food
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
.goods
	display flex 
	position absolute
	top 183px
	bottom 46px
	width 100%
	overflow hidden
	.menu-wrapper
		flex 0 0 80px
		width 80px
		background-color #f3f5f7
		.menu-item
			display table
			width 56px
			height 54px
			line-height 14px
			padding 0 12px
			&.current
				position relative
				background-color #fff
				font-weight 700
				margin-top -1px
				z-index 10
				.text
					border-none()
			.icon
				display: inline-block
				width: 12px
				height: 12px
				margin-right: 2px
				background-size: 12px 12px
				background-repeat: no-repeat
				&.decrease
					bg-image('decrease_3')
				&.discount
					bg-image("discount_3")
				&.guarantee
					bg-image("guarantee_3")
				&.invoice
					bg-image('invoice_3')
				&.special
					bg-image('special_3')
		.text 
			display table-cell
			vertical-align middle
			width 56px
			font-size 12px
			border-1px(rgba(1, 17, 27, 0.2))
	.foods-wrapper	
		flex 1
		.title
			padding-left 14px
			font-size 12px
			border-left 1px solid #d9dde1
			line-height 26px
			height 26px
			color rgb(147, 153, 159)
			background-color #f3f5f7
		.food-item	
			display flex 
			margin 18px 
			padding-bottom 18px
			border-1px(rgba(1, 17, 27, 0.2))
			&:last-child
				border-none()
				margin-bottom 0
			.icon 
				flex 0 0 57px
				margin-right 10px
			.content 
				flex 1
				.name
					margin 2px 0 8px 0
					height 14px
					line-height 14px
					font-size 14px
					color rgb(7, 17 ,27)
				.extra,.desc
					font-size 10px
					line-height 10px
					color rgb(147, 153, 159)
				.desc
					margin-bottom 8px
					line-height 12px
				.extra
					.count
						margin-right 12px
				.price	
					font-weight 700
					line-height 24px
					.now
						margin-right 8px
						font-size 14px
						color rgb(240, 20 ,20)
					.old	
						text-decoration line-through	
						font-size 10px
				.cartcontrol-wrapper
					position absolute
					right 0
					bottom 12px		
</style>		