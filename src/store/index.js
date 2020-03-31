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
   addCounter(state,payload){
    payload.count++;
   },
   addToCart(state,payload){
    state.cartLists.push(payload)
   }
  },
  actions:{
    addCart(context,payload){
      // state.cartLists.push(payload);
      // console.log('---');
      // 查找之前数组中是否有该商品
      let oldProduct=context.state.cartLists.find(item=>item.iid===payload.iid)
      // 判断oldProduct
      if(oldProduct){
        context.commit('addCounter',oldProduct)
      }else{
        payload.count=1;
        context.commit('addToCart',payload)
      }
    }
  }
})