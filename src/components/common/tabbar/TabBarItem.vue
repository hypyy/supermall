<template>
    <div class="tab-bar-item" @click="itemClick()">
      <div  v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="isActivecolor"><slot name="item-text"></slot></div>
<!--      <img src="../../assets/img/tabbar/home.svg">-->
<!--      <div>首页</div>-->
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        data(){
          return{
            // isActive:false
          }
        },
      computed:{
        isActive(){
            return this.$route.path.includes(this.path)
          // return this.$route.path.indexOf(this.path)!==-1
          // 1、indexOf：返回的是元素的所在下标，如果不存在则返回-1
          // 优点：元素存在可获取到元素的位置
          // 缺点：(1)无法判断是否有NaN的元素(2)返回的值不够语义化，需要我们进行处理
          //
          // 2、includes：返回一个Boolean值，有：true，没有：false
          // 优点：(1)可判断NaN元素(2)返回值十分语义化，不需要再次处理
          // 缺点：无法获取元素的下标
        },
        isActivecolor(){
          return this.isActive ? {color:this.activeColor}:{}
        }
      },
      props:{
        path:String,
        activeColor:{
          type:String,
          default:'red'
        }
      },
      methods:{
          itemClick(){
            this.$router.replace(this.path)
          }
      }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 12px;
    /*border: 1px solid blueviolet;*/
  }
  .tab-bar-item img{
    height: 24px;
    width:24px;
    margin-top: 3px;
    vertical-align: middle;
    /*这个方法可以去掉图片下面自带的3个像素*/
  }
  .active{
    color: red;
  }
</style>
