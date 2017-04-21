import Vue from 'vue'
import Router from 'vue-router'
import HotMovie from '@/components/HotMovie'
import RankMovie from '@/components/RankMovie'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HotMovie',
      component: HotMovie
    },
    {
      path: '/RankMovie',
      name: 'RankMovie',
      component: RankMovie
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    }
  ]
})
