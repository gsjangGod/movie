<template>
  <div id="app">
	<router-view></router-view>
    <tabbar>
		<tabbar-item selected link="/">
			<img slot="icon" src="./assets/img/tab-hot-def.png">
			<span slot="label">热映影片</span>
		</tabbar-item>
		<tabbar-item show-dot link="/RankMovie">
			<img slot="icon" src="./assets/img/tab-rank-def.png">
			<span slot="label">影片排行</span>
		</tabbar-item>
		<tabbar-item badge="20" link="/Search">
			<img slot="icon" src="./assets/img/tab-search-def.png" width="25" height="25">
			<span slot="label">影片搜索</span>
		</tabbar-item>
	</tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, Divider } from 'vux'

export default {
  name: 'app',
  data () {
  	return {
  		check:true
  	}
  },
  components: {
  	Tabbar,
  	TabbarItem,
  	Divider
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
  font-size:10pt;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
	color:#333!important;
	font-weight:bold
}
.weui-tabbar{
	position:fixed!important;
	bottom:-1px!important;
}
</style>
