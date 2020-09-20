<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span>客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span>店铺</span>
            </div>
            <div>
                <i class="icon select"></i>
                <span>收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addtoCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBotomBar",
        methods:{
            addtoCart(){
                this.$emit('addtocart')
            }
        }
    }
</script>

<style>
    .bottom-bar{
        height: 58px;
        background-color: #ffffff;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        text-align: center;
    }
    .bar-item{
        flex: 1;
        display: flex;
    }
    .bar-item>div{
        flex: 1;
    }
    .bar-left .icon{
        display: flex;
        width: 22px;
        height: 22px;
        margin: 10px auto 3px;
        background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    }
    .bar-left .service{
        background-position: 0 -54px;
    }
    .bar-left .shop{
        background-position: 0 -98px;
    }
    .bar-right{
        font-size: 15px;
        color: #ffffff;
        line-height: 58px;
    }
    .bar-right .cart{
        background-color: #ffe817;
    }
    .bar-right .buy{
        background-color: var(--color-tint);
        color: white;
    }
</style>