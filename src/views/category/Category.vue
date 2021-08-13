<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li>分类第1个li</li>
      <li>分类第2个li</li>
      <li>分类第3个li</li>
      <li>分类第4个li</li>
      <li>分类第5个li</li>
      <li>分类第6个li</li>
      <li>分类第7个li</li>
      <li>分类第8个li</li>
      <li>分类第9个li</li>
      <li>分类第10个li</li>
      <li>分类第11个li</li>
      <li>分类第12个li</li>
      <li>分类第13个li</li>
      <li>分类第14个li</li>
      <li>分类第15个li</li>
      <li>分类第16个li</li>
      <li>分类第17个li</li>
      <li>分类第18个li</li>
      <li>分类第19个li</li>
      <li>分类第20个li</li>
      <li>分类第21个li</li>
      <li>分类第22个li</li>
      <li>分类第23个li</li>
      <li>分类第24个li</li>
      <li>分类第25个li</li>
      <li>分类第26个li</li>
      <li>分类第27个li</li>
      <li>分类第28个li</li>
      <li>分类第29个li</li>
      <li>分类第30个li</li>
      <li>分类第31个li</li>
      <li>分类第32个li</li>
      <li>分类第33个li</li>
      <li>分类第34个li</li>
      <li>分类第35个li</li>
      <li>分类第36个li</li>
      <li>分类第37个li</li>
      <li>分类第38个li</li>
      <li>分类第39个li</li>
      <li>分类第40个li</li>
      <li>分类第41个li</li>
      <li>分类第42个li</li>
      <li>分类第43个li</li>
      <li>分类第44个li</li>
      <li>分类第45个li</li>
      <li>分类第46个li</li>
      <li>分类第47个li</li>
      <li>分类第48个li</li>
      <li>分类第49个li</li>
      <li>分类第50个li</li>
      <li>分类第51个li</li>
      <li>分类第52个li</li>
      <li>分类第53个li</li>
      <li>分类第54个li</li>
      <li>分类第55个li</li>
      <li>分类第56个li</li>
      <li>分类第57个li</li>
      <li>分类第58个li</li>
      <li>分类第59个li</li>
      <li>分类第60个li</li>
      <li>分类第61个li</li>
      <li>分类第62个li</li>
      <li>分类第63个li</li>
      <li>分类第64个li</li>
      <li>分类第65个li</li>
      <li>分类第66个li</li>
      <li>分类第67个li</li>
      <li>分类第68个li</li>
      <li>分类第69个li</li>
      <li>分类第70个li</li>
      <li>分类第71个li</li>
      <li>分类第72个li</li>
      <li>分类第73个li</li>
      <li>分类第74个li</li>
      <li>分类第75个li</li>
      <li>分类第76个li</li>
      <li>分类第77个li</li>
      <li>分类第78个li</li>
      <li>分类第79个li</li>
      <li>分类第80个li</li>
      <li>分类第81个li</li>
      <li>分类第82个li</li>
      <li>分类第83个li</li>
      <li>分类第84个li</li>
      <li>分类第85个li</li>
      <li>分类第86个li</li>
      <li>分类第87个li</li>
      <li>分类第88个li</li>
      <li>分类第89个li</li>
      <li>分类第90个li</li>
      <li>分类第91个li</li>
      <li>分类第92个li</li>
      <li>分类第93个li</li>
      <li>分类第94个li</li>
      <li>分类第95个li</li>
      <li>分类第96个li</li>
      <li>分类第97个li</li>
      <li>分类第98个li</li>
      <li>分类第99个li</li>
      <li>分类第100个li</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  // 组件创建完后调用
  created() {
    // console.log(this.$refs.aaa);
    // console.log(document.querySelector('.wrapper'));
    //
    // this.scroll = new BScroll(document.querySelector('.wrapper'), {
    // })
  },
  mounted() {
    // console.log(this.$refs.aaa);
    // console.log(document.querySelector('.wrapper'));

    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 3,
      pullUpLoad: true
    })

    this.scroll.on('scroll', (position) => {
      console.log(position);
    })

    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');
    })
  },
  methods: {
    btnClick() {
      console.log('btnClick');
    }
  }
}
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
