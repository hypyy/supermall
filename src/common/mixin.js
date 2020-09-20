import {debounce} from "./utils";

export const itemListenerMixin= {
    data() {
        return {
            itemImageListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 500)
        this.itemImageListener = () => {
            refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImageListener)
    }
}
export const backTopMixin={
    data(){
        return{
            isShow:false
        }
    },
    methods:{
        backClick(){
            //使其回到顶部，用ref来链接组件与组件之间的关系
            this.$refs.scroll.scrollTo(0,0,500)
        },
    }
}