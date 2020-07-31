<template>
    <div id="home">
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
        <HomeSwiper :banners="banners"></HomeSwiper>
        <RecommendView :recommends="recommends"></RecommendView>
        <FeatureView></FeatureView>
        <TabControl class="tab-control" :titles="titles"></TabControl>
        <goods-list :goods="goods['pop'].list"></goods-list>


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

    import {getHomeMultidata,getHomeGoods} from "network/home";

    export default {
        name: "Home",
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            GoodsListItem
        },
        data(){
            return{
                banners:[],
                recommends:[],
                titles:['精选','流行','新款'],
                goods:{
                    'pop':{page:'0',list:[]},
                    'new':{page:'0',list:[]},
                    'sell':{page:'0',list:[]}
                },

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
        methods:{
            getHomeMultidata(){
                getHomeMultidata().then(res=>{
                    this.banners=res.data.banner.list
                    this.recommends=res.data.recommend.list
                })
            },
            getHomeGoods(type){
                //传入的type是一个变量，所以不能用goods.而要用goods[]的形式
                const page=this.goods[type].page+1
                getHomeGoods(type,page).then(res=>{
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page+=1
                })
            }
        }
    }
</script>

<style scoped>
    #home{
        padding-top: 44px;
        padding-bottom: 50px;
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
        z-index: 55;
    }
</style>
