<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="dereaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">
			{{food.count}}
		</div>
		<!-- <div class="cart-add icon-add_circle" v-on="{ click: [con,addCart] }"> -->
    	<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>	
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	name:'cartcontrol',
	data() {
		return{

		}
	},
	props: {
		food: {
			type: Object
		}
	},
	created(){

	},
	methods:{
		con(event){
			if(!event._constructed){
				return
			}
			console.log('cart-con')
			// this.$emit('con')
		},
		addCart(event){
			if(!event._constructed){
				return
			}
			if(!this.food.count){
				// this.food.count = 1 //这样vue监听不到引用数据（如object、array类型）更新
				Vue.set(this.food,'count',1)
			}else{
				this.food.count++
			}
			this.$emit('add',event.target)
		},
		dereaseCart(){
			if(this.food.count>0){
				this.food.count--
			}
		}
	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
	.cartcontrol
		font-size 0
		.cart-decrease
			display inline-block
			padding 6px
			opacity: 1
			transform: translate3d(0, 0, 0)
			.inner
				display inline-block
				font-size 24px
				line-height 24px
				color rgb(0, 160, 220)
				transition all 0.4s linear
				transform rotate(0)	
			&.move-enter-active, &.move-leave-active
				transition all 0.4s linear
			&.move-enter, &.move-leave-to
				opacity 0
				transform translate3d(24px, 0, 0)
				.inner
					transform rotate(180deg)	
		.cart-count
			display inline-block
			vertical-align top
			text-align center
			width 12px
			padding-top 6px
			font-size 10px
			color rgb(147, 153, 159)
			line-height 24px
		.cart-add
			display inline-block
			padding 6px
			font-size 24px
			line-height 24px
			color rgb(0, 160, 220)	
</style>