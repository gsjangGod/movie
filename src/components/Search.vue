<template>
  <div class="search">
    <!-- <img src="../assets/img/timg.jpg" width="100%"> -->
    <search
    v-model="value"
    position="relative"
    auto-scroll-to-top top="0px"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    @on-focus="onFocus"
    ref="search"></search>

    <div v-transfer-dom>
      <loading v-model="show1" :text="text1"></loading>
    </div>

    <scroller lock-x scrollbar-y ref="scroller" style="position:absolute;top:44px;bottom:53px;left:0;right0">
      <flexbox id="list" :gutter="0" wrap="wrap">
        <flexbox-item :span="1/2" v-for='list in results'>
          <div class="flex-list">
            <img :src='list.images.medium' alt="">
          </div>
        </flexbox-item>
      </flexbox>
    </scroller>
  </div>
</template>

<script>
import { Search, Loading,Flexbox, Scroller, FlexboxItem, TransferDomDirective as TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Search,
    Loading,
    Flexbox,
    FlexboxItem,
    Scroller
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? this.Result(this.value) : []
    },
    onSubmit (val) {
      var the = this;
      the.show1 = true;
      this.$http.get('https://node-douban-api.herokuapp.com/movie/search?q='+val).then(function(res){
        the.results = res.data.subjects;
        console.log(the.results)
        setTimeout(()=>{
          the.show1 = false;
          the.$nextTick(() => {
            the.$refs.scroller.reset()
          })
        },1000)
      })
      // document.getElementById('list').style.position="absolute";
      // document.getElementById('list').style.top="45px";
    },
    onFocus () {
      // document.getElementById('list').style.position="absolute";
      // document.getElementById('list').style.top="45px";
    },
    onCancel () {
      console.log('on cancel')
    },
    Result (val) {
      
      let rs = []
      for (let i = 0; i < 8; i++) {
        rs.push({
          title: `${val} result: ${i + 1} `,
          other: i
        })
      }
      return rs
    }
  },
  data () {
    return {
      results: [],
      value: '',
      show1: false,
      text1: 'Loading'
    }
  }
}

// function getResult (val) {
//   let rs = []
//   for (let i = 0; i < 8; i++) {
//     rs.push({
//       title: `${val} result: ${i + 1} `,
//       other: i
//     })
//   }
//   return rs
// }
</script>

<style type="text/css">
  .search{
    height:100vh;
  }
</style>