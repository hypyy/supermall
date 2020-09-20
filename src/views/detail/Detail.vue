<template>
    <div id="detail">
        <detail-navbar @itemClick="titleClick" ref="nav"></detail-navbar>
        <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <DetailSwiper :top-images="topImages"></DetailSwiper>
            <DetialBaseInfo :goods="goods"></DetialBaseInfo>
            <DetailShopInfo :shop="shop"></DetailShopInfo>
            <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
            <DetailParams :param-info="paramInfo" ref="params"></DetailParams>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommend"></goods-list>
        </Scroll>
        <BackTop @click.native="backClick" v-show="isShow"></BackTop>
        <DetailBottomBar @addtocart="addtoCart"></DetailBottomBar>

    </div>
</template>

<script>
    import DetailNavbar from "./childComps/DetailNavbar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetialBaseInfo from "./childComps/DetialBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "components/common/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParams from "./childComps/DetailParams";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import BackTop from "components/content/backTop/BackTop";

    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
    import {debounce} from "common/utils";
    import {itemListenerMixin,backTopMixin} from "common/mixin";

    export default {
        name: "Detail",
        components: {
            DetailShopInfo,
            DetailSwiper,
            DetailNavbar,
            DetialBaseInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParams,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            BackTop
        },
        //混入就是把mixin里面的东西添到这里面来
        mixins:[itemListenerMixin,backTopMixin],
        data(){
            return{
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                themeTopYs:[],
                currentIndex:0,
            }
        },
        created() {
            //1、保留传入的iid
            this.iid=this.$route.params.iid

            //根据iid请求详细数据
            getDetail(this.iid).then(res=>{
                const data=res.result
                //1.获取顶部轮播数据
                this.topImages=data.itemInfo.topImages

                //2、获取商品信息
                this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

                //3.创建店铺信息的对象
                this.shop=new Shop(data.shopInfo)

                //4.保存商品详情数据
                this.detailInfo=data.detailInfo

                //5、获取参数信息
                this.paramInfo= new GoodsParam(data.itemParams.info,data.itemParams.rule)

                //6.取出评论信息
                if(data.rate.cRate!=0){
                    this.commentInfo=data.rate.list[0]
                }


//                  问题:在哪里才能获取到正确的offsetTop
//                   1.created肯定不行，压根不能获取元素
//                   2.mounted也不行,数据还没有获取到
//                   3.获取到数据的回调中也不行，DOM还没有渲染完
//                   4.$nextTick也不行.因为图片的高度没有被计算在类
//                   5.在图片加载完成后.获取的高度才是正确

                //1.第一次获取，值不对
                //值不对的原因：this.$refs.params.$el还没来得及渲染
                // this.themeTopYs=[]
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                // console.log(this.themeTopYs);

                // this.$nextTick(()=>{
                    //第二次获取：值不对
                    //根据最新的数据，对应的DOM是已经被渲染出来了
                    //但是图片依然没有加载完(目标获取到的offsettop都是不包含图片的)
                    // offsettop值不对的时候都是因为图片的问题
                       // this.themeTopYs=[]
                       // this.themeTopYs.push(0);
                       // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                       // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                       // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                       // console.log(this.themeTopYs);
                // })

            })

            //请求推荐数据
            getRecommend().then(res=>{
                this.recommends=res.data.list
            })
        },

        methods:{
            imageLoad(){
                this.$refs.scroll.refresh()

                this.themeTopYs=[]
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)
                console.log(this.themeTopYs);
            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,500)
            },
            contentScroll(position){
                //获取y值
                const positionY=-position.y+44
                //positionY和主题中的Y进行对比
                let length=this.themeTopYs.length
                // for(let i=0;i<length;i++){
                    // 条件1是为了防止赋值的过程过于平凡
                    // if(this.currentIndex!==i && ((i<length-1 && positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
                    //     ||(i===length-1 && positionY>this.themeTopYs[i]))){
                    //     this.currentIndex=i;
                    //     console.log(this.currentIndex);
                    //     this.$refs.nav.currentIndex=this.currentIndex
                    // }
                // }
                for(let i=0;i<length-1;i++){
                    if(this.currentIndex!==i&&(positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
                        this.currentIndex=i;
                        this.$refs.nav.currentIndex=this.currentIndex
                    }
                }
                // 3.是否显示回到顶部
                this.isShow=(-position.y)>1000
            },
            addtoCart(){
                const product={}
                product.image=this.topImages[0];
                product.title=this.goods.title;
                product.desc=this.goods.desc;
                product.price=this.goods.realPrice;
                product.iid=this.iid

                //2.将商品添加到购物车里
                this.$store.commit('addCart',product)
                console.log(this.$store.state.cartList[0]);


            }

        },
        mounted() {
            const refresh=debounce(this.$refs.scroll.refresh,500)

            this.itemImageListener=()=>{
                refresh()
            }

            this.$bus.$on('itemImgLoad', this.itemImageListener)
        },
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImageListener)
        }
    }
</script>

<style scoped>
    #detail{
        /*相对定位可以使位置不变，进行微调和z-index*/
        position: relative;
        z-index: 10;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px);
        overflow: hidden;
    }
</style>