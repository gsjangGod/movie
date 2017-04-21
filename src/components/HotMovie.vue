<template>
<scroller lock-x scrollbar-y ref="scroller" height="-53px">
	<div class="hot">
		<flexbox :gutter="0" wrap="wrap">
			<h2>{{hot.title}}</h2>
			<flexbox-item :span="1/3" v-for='hotList in hot.subjects' :key='hot.id'>
				<a href="###"><img :src='hotList.images.medium' width="100" height="140"></a>
				<p>{{hotList.title}}</p>
			</flexbox-item>
		</flexbox>
		<flexbox :gutter="0" wrap="wrap">
			<h2>{{coming.title}}</h2>
			<flexbox-item :span="1/3" v-for='comingList in coming.subjects' :key='coming.id'>
				<a href="###"><img :src='comingList.images.medium' width="100" height="140"></a>
				<p>{{comingList.title}}</p>
			</flexbox-item>
		</flexbox>
		<divider>我都到底了~ ^v^</divider>
	</div>
</scroller>
</template>

<script>
	import { Divider, Flexbox, FlexboxItem, Scroller } from 'vux'

	export default {
		name: 'hot',
		data () {
		return {
			hot:[],
			coming:[]
		}
		},
		mounted () {

			var the = this;
			function getHot() {
				return the.axios.get('https://node-douban-api.herokuapp.com/movie/in_theaters?start=0&count=9');
			}

			function getComing() {
				return the.axios.get('https://node-douban-api.herokuapp.com/movie/coming_soon?start=0&count=9');
			}
			var hotStor = localStorage.getItem('hot');
			var comingStor = localStorage.getItem('coming');
			if(hotStor!=null&&comingStor!=null){
				the.hot = JSON.parse(hotStor);
				the.coming = JSON.parse(comingStor);
			}else{
				this.axios.all([getHot(),getComing()])
			  .then(this.axios.spread(function (gethot, getcoming) {
			    // Both requests are now complete
		    	the.hot = gethot.data;
				the.coming = getcoming.data;
				localStorage.setItem('hot',JSON.stringify(gethot.data))
		    	localStorage.setItem('coming',JSON.stringify(getcoming.data))
			  }));
			}

		},
		components:{
			Divider,
			FlexboxItem,
			Flexbox,
			Scroller
		}
	}
</script>

<style>
	.hot{
		background:#fff;
		padding:10px;
		margin:0px 10px;
	}
	.hot h2{
		width:100%;
		color:#555;
		padding:5px 0px;
	}
	.hot p{
		text-overflow: ellipsis;
		overflow:hidden;
		white-space: nowrap;
		margin-bottom:5px;
	}
	.vux-flexbox-item{
		text-align:center;
	}
</style>