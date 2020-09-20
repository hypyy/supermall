<template>
    <div class="goods-item" @click="itemClick">
       <img :src="showImage" @load="imgLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props:{
            goodsItem:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            imgLoad(){
                // 用路由的方法做的判断，什么时候发送全局变量
                // if(this.$router.path.indexOf('/home')){
                //     this.$bus.$emit('homeitemImageLoad')
                // }else if(this.$router.path.indexOf('/detail'){
                //     this.$bus.$emit('detailitemImageLoad')
                // }
                //
                this.$bus.$emit('itemImageLoad')

            },
            itemClick(){
                this.$router.push('/detail/' + this.goodsItem.iid)
            }
        },
        computed:{
            // 为了防止主页商品和详情页推荐商品冲突
            showImage(){
                return this.goodsItem.image ||this.goodsItem.show.img
            }
        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;
        width:48% ;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>