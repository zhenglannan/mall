import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    cartLists:[]
  },
  // mutations唯一的目的就是修改state中值
  // mutations每个方法尽可能完成的的事件单一
  mutations:{
    // 增加数量
   addCounter(state,payload){
    payload.count++;
   },
  //  减少数量
   lessCounter(state,payload){
    payload.count--;
   },
  //  加入购物车列表数据
   addToCart(state,payload){
    state.cartLists.push(payload)
   },
  //  移除
   remove(state,payload){
     state.cartLists.splice(payload,1)
   }
  },
  actions:{
    // 很多操作最好放在action里，mustations里放常规操作
    addCart(context,payload){
      // state.cartLists.push(payload);
      // console.log('---');
      // 查找之前数组中是否有该商品
      
      // actions返回promise
      return new Promise((resolve,reject)=>{
        let oldProduct=context.state.cartLists.find(item=>item.iid===payload.iid)
        // 判断oldProduct
        if(oldProduct){
          context.commit('addCounter',oldProduct);
          resolve('当前商品加1')
        }else{
          payload.checked=true;
          payload.count=1;
          context.commit('addToCart',payload)
          resolve('当前商品添加成功')
        }
      });
     
    }
  },
  // 计算属性(getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。)
  getters:{
    getLength(state){
      return state.cartLists.length
    },
    getCartList(state){
      return state.cartLists
    }
  }
})