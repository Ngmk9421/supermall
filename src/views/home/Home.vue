<template>
  <div id="home">
<!--    导航条-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"
                   ref="tabControl1" class="tab-control" v-show="isTabFixed"/>

<!--    滚动区域-->
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

<!--    返回顶部-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 子组件
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

// 公共组件
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backTop/BackTop"

// 方法
import {
  getHomeMultidata,
  getHomeGoods
} from "network/home"
import {debounce} from "common/utils"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata()

    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    // 1. 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    this.$bus.$on('itemImageLoad', () => {
      // console.log('-----');
      // 刷新频繁 防抖处理  防抖debounce/节流throttle
      // this.$refs.scroll && this.$refs.scroll.refresh()

      refresh()
    })
  },
  destroyed() {
    console.log('home页销毁');
  },
  activated() {
    // console.log('activated');
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // 监听组件根元素的原生事件
      // console.log('backClick');
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // console.log(position);
      // 1. 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2. 决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      // console.log(this.tabOffsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  /* vh -> viewport*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 使用浏览器原生滚动时，定位导航不跟随滚动 */
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

/* C3 吸顶效果 */
/*.tab-control {*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/

.content {
  /*height: 300px;*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
