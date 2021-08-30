import BackTop from "components/content/backTop/BackTop"
import {POP, NEW, SELL, BACKTOP_DISTANCE} from "./const";
import {debounce} from "./utils"

export const backTopMixin = {
  components: {
    BackTop
  },
  data: function () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop: function () {
      // 监听组件根元素的原生事件
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  components: {},
  methods: {},
  mounted() {
    // 1. 监听item中图片加载完成
    this.refresh = debounce(this.$refs.scroll.refresh, 50)

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      // console.log('-----');
      // 刷新频繁 防抖处理  防抖debounce/节流throttle
      // this.$refs.scroll && this.$refs.scroll.refresh()

      this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('混入 2 mounted生命周期函数');
  }
}
