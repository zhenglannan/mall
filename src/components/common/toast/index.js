import Toast from './Toast'

const obj={}
// Vue就是一个func
obj.install=function(Vue){
  // console.log('执行',Vue);
  // console.log(Toast.$el)

  // 1.创建组件构造器
  const toastConstructor=Vue.extend(Toast);

  // 2.new的方式 ,根据组件构造器创建一个组件对象
  const toast =new toastConstructor();

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast=toast  
  // 把模板添加到body上面

}
export default obj