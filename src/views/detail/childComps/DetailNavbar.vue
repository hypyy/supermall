<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles"
                     class="title-item"
                     :class="{active:currentIndex===index}" @click="changeindex(index)">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    export default {
        name: "DetailNavbar",
        components: {NavBar},
        data(){
            return{
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            changeindex(index){
                this.currentIndex=index
                this.$emit('itemClick',index)
            },
            backClick(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 13px;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color:var(--color-high-text);
    }
    .back img{
        margin-top: 10px;
    }
</style>