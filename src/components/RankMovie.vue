<template>

	<div class="movieTop">
		<div class="top250">
			<h2>{{ top.title }}</h2>

			<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
			    <div class="topList" v-for='list in top'>

			    	<div class="img">
			    		<img :src='list.images.large'>
			    	</div>

			    	<div class="title">{{ list.title }}</div>

			    	<div class="detail">
			    		<ul>
			    			<li>上映时间：{{list.year}}年</li>
			    			<li>
			    				主演：<span v-for='casts in list.casts'>{{casts.name}}</span>
			    			</li>
			    			<li>评分：{{list.rating.average}}</li>
			    		</ul>
			    	</div>
			    </div>

		    </div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'movieTop',
  data () {
    return {
      top:[],
      count:0,
      busy: false
    }
  },
  methods: {
  	loadMore: function() {
  		let the = this;
  		if(localStorage.getItem('top20')==null){
  			this.$http.get('https://node-douban-api.herokuapp.com/movie/top250?start=0&count=250')
			  	.then(function(res){
			  		localStorage.setItem('top20',JSON.stringify(res.data));
			  		the.busy = true;
			  		setTimeout(() => {
			  			let topData = res.data;
			        for (let i = (0+the.count); i < (the.count+5); i++) {
			          the.top.push(topData.subjects[i]);
			        }
			        the.count += 5;
			        the.busy = false;
			      }, 1000);
		  		})
  		}else{
  			the.busy = true;
	  		console.log(JSON.parse(localStorage.getItem('top20')))
	  		setTimeout(() => {
	  			let topData = JSON.parse(localStorage.getItem('top20'));
	        for (let i = (0+the.count); i < (the.count+5); i++) {
	          the.top.push(topData.subjects[i]);
	        }
	        the.count += 5;
	        the.busy = false;
	      }, 1000);
	      the.busy = false;
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.movieTop{
		width:100%;
	}
	.movieTop .top250{
		margin:0 auto;
		padding:10px 0 60px 0;
		border-radius:5px;
	}
	.top250 .topList{
		max-width:304px;
		margin:0 auto 20px auto;
		padding:15px;
		background:#fff;
		border-radius:5px;
		box-shadow:0 0 5px #f5f5f5;
	}
	.top250 .img{
		text-align:center;
	}
	.top250 .img img{
		border:2px solid #fff;
		box-shadow:0px 0px 5px #787878;
	}
	.top250 .title{
		padding:10px 0px;
		text-align:center;
		color:#555;
		font-size:1.05em;
	}
	.top250 .detail li{
		color:#898989;
		list-style: none;
	}
	.top250 .detail span::after{
		content:' / ';
	}
	.top250 .detail span:last-child::after{
		content:'';
	}
</style>
