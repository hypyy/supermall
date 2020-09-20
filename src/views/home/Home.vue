<template>
    <div id="home">
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
        <TabControl :titles="titles"
                    @tabClick="tabClick"
                    ref="tabControl1"
                    class="tab-control"
                    v-show="isTabfixed"></TabControl>
        <Scroll class="content"
                ref="scroll"
                :probe-type=3
                :pull-up-load="true"
                @scroll="contentscroll"
                @pullingUp="loadMore">
            <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
            <RecommendView :recommends="recommends"></RecommendView>
            <FeatureView></FeatureView>
            <TabControl :titles="titles"
                        @tabClick="tabClick"
                        ref="tabControl2"></TabControl>
            <goods-list :goods="showGoods"></goods-list>
        </Scroll>
<!--        @click.native是对组件的监听事件-->
        <BackTop @click.native="backClick" v-show="isShow"></BackTop>
    </div>
</template>

<script>
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import GoodsListItem from "components/content/goods/GoodsListItem";
    import Scroll from "components/common/scroll/Scroll";
    import BackTop from "components/content/backTop/BackTop";

    import {getHomeMultidata,getHomeGoods} from "network/home";
    import {debounce} from "common/utils";

    import BScroll from 'better-scroll'

    export default {
        name: "Home",
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            GoodsListItem,
            Scroll,
            BackTop
        },
        data(){
            return{
                banners:[],
                recommends:[],
                titles:['精选','流行','新款'],
                goods:{
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]}
                },
                currentType:'pop',
                isShow:false,
                taboffsetTop:0,
                isTabfixed:false,
                saveY:0,
                itemImageListener:null
            }
        },
        //created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
        // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
        created() {
            //1.请求多个数据
            //把这个封装到methods里面可以更直观的反应出created调用了什么函数
            this.getHomeMultidata()

            //2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')

        },
        activated() {
            this.$refs.scroll.scrollTo(0,this.saveY,1)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            //保存Y值
            this.saveY=this.$refs.scroll.getScrollY()
            //取消全局时间的监听
            this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
        mounted() {
            //图片加载完成过后的事件监听
            const refresh=debounce(this.$refs.scroll.refresh,500)
            // 3.监听item中图片加载完成
            this.itemImageListener=()=>{
                refresh()
            }
            this.$bus.$on('itemImageLoad',this.itemImageListener)

            //2.获取tabControl的offsetTop
            //所有的组件都有一个属性$el：用于获取组件中的元素
            // console.log(this.$refs.tabControl.$el.offsetTop);
        },
        computed:{
            showGoods(){
                return this.goods[this.currentType].list
            }
        },
        methods:{
           /*
           事件监听相关的方法
            */
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentType='pop';
                        break;
                    case 1:
                        this.currentType='new'
                        break;
                     case 2:
                         this.currentType='sell';
                         break
                }
                this.$refs.tabControl1.currentIndex=index
                this.$refs.tabControl2.currentIndex=index
             },
            backClick(){
                //使其回到顶部，用ref来链接组件与组件之间的关系
                this.$refs.scroll.scrollTo(0,0,500)
            },
            //当首页轮播图加载完成之后就可以去取tabControl2到顶部的距离了
            swiperImageLoad(){
                this.taboffsetTop=this.$refs.tabControl2.$el.offsetTop;
            },
            contentscroll(position){
                // if(-position.y>1000){
                //     this.isShow=true
                // }else{
                //     this.isShow=false
                // }
                // or
                //1.判断BackTop是否显示
                this.isShow=(-position.y)>1000

                // console.log(this.taboffsetTop);
                // 2.决定tabControl是否吸顶(position:fixed)
                this.isTabfixed=(-position.y)>this.taboffsetTop

            },
            loadMore(){
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.finishPullUp()
            },
            /*
             * 网络请求相关的方法
             */
            getHomeMultidata(){
                getHomeMultidata().then(res=>{
                    this.banners=res.data.banner.list
                    this.recommends=res.data.recommend.list
                })
            },
            getHomeGoods(type){
                //传入的type是一个变量，所以不能用goods.而要用goods[]的形式
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                })
            },
        }
    }
</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 9;*/
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>
