<template>
    <div id="home">
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
        <Scroll class="content"
                ref="scroll"
                :probe-type=3
                :pull-up-load="true"
                @scroll="contentscroll" @pullingUp="loadMore">
            <HomeSwiper :banners="banners"></HomeSwiper>
            <RecommendView :recommends="recommends"></RecommendView>
            <FeatureView></FeatureView>
            <TabControl class="tab-control" :titles="titles" @tabClick="tabClick"></TabControl>
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
                isShow:false
            }
        },
        created() {
            //1.请求多个数据
            //把这个封装到methods里面可以更直观的反应出created调用了什么函数
            this.getHomeMultidata()

            //请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
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
             },
            backClick(){
                //使其回到顶部，用ref来链接组件与组件之间的关系
                this.$refs.scroll.scrollTo(0,0,500)
            },
            contentscroll(position){
                // if(-position.y>1000){
                //     this.isShow=true
                // }else{
                //     this.isShow=false
                // }
                // or
                this.isShow=(-position.y)>1000
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
    #home{
        padding-top: 44px;
        padding-bottom: 50px;
        height: 100vh;
    }

    .home-nav{
        background: var(--color-tint);
        color: white;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 99;
    }
    .tab-control{
        position: sticky;
        top: 44px;
        z-index: 20;
    }
    .content{
        height: calc(100%);
        overflow: hidden;
    }
</style>
