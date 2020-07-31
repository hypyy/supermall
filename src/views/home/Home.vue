<template>
    <div id="home">
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
        <HomeSwiper :banners="banners"></HomeSwiper>
        <RecommendView :recommends="recommends"></RecommendView>
        <FeatureView></FeatureView>
        <h2>首页</h2>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import {getHomeMultidata} from "network/home";

    export default {
        name: "Home",
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView
        },
        data(){
            return{
                banners:[],
                recommends:[]
            }
        },
        created() {
            //1.请求多个数据
            getHomeMultidata().then(res=>{
                this.banners=res.data.banner.list
                this.recommends=res.data.recommend.list
            })
        }
    }
</script>

<style scoped>
    .home-nav{
        background: var(--color-tint);
        color: white;
    }
</style>
