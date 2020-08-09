<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data(){
          return{
              scroll:null
          }
        },
        props:{
          probeType: {
              type:Number,
              default:0
          },
            pullUpLoad:{
              type: Boolean,
              default: false
            }
        },
        mounted() {
            // this.scroll=new BScroll(document.querySelector('.wrapper'),{
            //
            // })
            //1、创建scroll对象
            this.scroll=new BScroll(this.$refs.wrapper,{

                // ref如果是绑定在组件中，那么通过this.$refs.refname获取的是一个组件对象
                // ref如果是绑定在普通元素中，那么通过this.$refs.refname获取的是一个元素对象

                //click设置为true的话就可以进行点击事件了
                click:true,
                //probeType是实时监听位置用的参数
                probeType:this.probeType,
                pullUpLoad: this.pullUpLoad
            })
            // 2、监听滚动的位置
            this.scroll.on('scroll',(position)=>{
                this.$emit('scroll',position)
            })

            //3、监听上拉事件
            this.scroll.on('pullingUp',()=>{
                console.log('aaa');
                this.$emit('pullingUp')
            })
        },
        methods:{
            scrollTo(x,y,time=300){
                this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll.finishPullUp()
            }
        }
    }
</script>

<style scoped>

</style>