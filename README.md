>此接口不是我的接口，禁止随便使用，想要使用可以添加大佬微信 coderwhy001

# Vue购物商城移动端及逻辑实现 
***技术栈实现：Vue-cli+Vue-Router+Vuex+axios***

**目录结构**
```
├─.browserslistrc
├─.editorconfig
├─.gitignor   ---------------------------------忽略配置,将本地代码上传到代码仓库时,要忽略的文件,例如node_modules
├─babel.config.js
├─package-lock.json ---------------------------项目文件名称,依赖包,对整个文件的描述，node里面的一些内容，让你的项目变成一个node包,脚手架自动生成的文件
├─package.json --------------------------------对整个应用程序的描述,应用名称,版本号,一些依赖包,以及项目的启动,打包，测试配置     
├─postcss.config.js
├─README.md ---------------------------------- 说明文档
├─vue.config.js -------------------------------设置别名
├─sr-------------------------------------------这个是我们最应该关注的，开发过程中最重要的一个目录,项目所用的所有源代码
|  ├─App.vue --------------------------------- 根组件 
|  ├─main.js --------------------------------- 入口js
|  ├─views ------------------------------------项目页面模块目录
|  |   ├─profile ------------------------------我的 页面模块
|  |   |    └Profile.vue
|  |   ├─home ----------------------------------首页页面模块
|  |   |  ├─Home.vue ---------------------------首页主组件
|  |   |  ├─childrens --------------------------子组件
|  |   |  |     ├─FeatureView.vue --------------特征组件
|  |   |  |     ├─HomeRecommendView.vue --------推荐组件
|  |   |  |     └HomeSwiper.vue   --------------轮播图组件
|  |   ├─detail   ------------------------------详情页模块
|  |   |   ├─Detail.vue 
|  |   |   ├─children
|  |   |   |    ├─DetailBaseInfo.vue  ----------详情页商品基础信息
|  |   |   |    ├─DetailBottomBar.vue ----------详情页底部栏
|  |   |   |    ├─DetailCommentInfo.vue --------详情页商品评论信息
|  |   |   |    ├─DetailGoodsInfo.vue ----------详情页商品信息
|  |   |   |    ├─DetailNavBar.vue -------------详情页导航栏
|  |   |   |    ├─DetailParamInfo.vue ----------详情页商品参数信息
|  |   |   |    ├─DetailRecommendInfo.vue ------详情页商品推荐信息
|  |   |   |    ├─DetailShopInfo.vue -----------详情页商家信息
|  |   |   |    └DetailSwiper.vue  -------------详情页商品轮播图
|  |   ├─category --------------分类页模块
|  |   |    ├─Category.vue
|  |   |    ├─children
|  |   |    |    ├─CategoryNavBar.vue -----------分类页导航栏
|  |   |    |    ├─TabContent.vue ---------------分类页右边栏信息封装
|  |   |    |    ├─TabContentCategory.vue  ------分类页TabMenu对应分类信息
|  |   |    |    ├─TabContentDetail.vue
|  |   |    |    └TabMenu.vue -------------------分类页左边菜单栏
|  |   ├─cart -----------------------------------购物车模块
|  |   |  ├─Cart.vue
|  |   |  ├─children
|  |   |  |    ├─CartBottomBar.vue --------------购物车底部栏
|  |   |  |    ├─CartList.vue -------------------购物车列表
|  |   |  |    ├─CartListItem.vue  --------------购物车列表商品
|  |   |  |    └CartNavBar.vue  -----------------购物车导航栏
|  ├─store ------------------------------------  项目vuex目录
|  |   └index.js ------------------------------- vuex主文件
|  ├─router ---------------------------------    项目路由目录
|  |   └index.js -----------------------------   路由主入口文件
|  ├─network ----------------------------------- 网络请求数据模块
|  |    ├─category.js ---------------------------请求分类数据封装
|  |    ├─detail.js -----------------------------请求详情页数据封装
|  |    ├─home.js -------------------------------请求主页数据 封装
|  |    └request.js ---------------------------- 请求封装
|  ├─components  --------------------------------公用组件
|  |     ├─content ------------------------------此项目公用组件
|  |     |    ├─tabControl ----------------------tab组件封装
|  |     |    |     └TabControl.vue
|  |     |    ├─maintabbar ----------------------项目底部导航栏封装
|  |     |    |     └MainTabBar.vue
|  |     |    ├─goods 
|  |     |    |   ├─GoodsList.vue ---------------商品列表封装
|  |     |    |   └GoodsListItem.vue ------------商品列表item封装
|  |     |    ├─checkbutton
|  |     |    |      └CheckButton.vue  ----------购物车选择按钮
|  |     |    ├─backtop 
|  |     |    |    └ToTop.vue -------------------返回顶部组件
|  |     ├─common -------------------------------多项目公用组件
|  |     |   ├─toast ----------------------------toast封装
|  |     |   |   ├─index.js
|  |     |   |   └Toast.vue
|  |     |   ├─tabbar 
|  |     |   |   ├─TabBar.vue -------------------底部导航栏
|  |     |   |   └TabBarItem.vue ----------------底部导航栏item
|  |     |   ├─swiper ---------------------------轮播图封装
|  |     |   |   ├─index.js
|  |     |   |   ├─Swiper.vue
|  |     |   |   └SwiperItem.vue
|  |     |   ├─scroll --------------------------better-Scroll插件封装
|  |     |   |   └Scroll.vue
|  |     |   ├─navbar -------------------------- 顶部导航栏
|  |     |   |   └NavBar.vue
|  |     |   ├─gridView -------------------------表格视图
|  |     |   |    └GridView.vue
|  ├─common  ---------------项目公用js
|  |   ├─const.js -------------------------------常量js
|  |   └utils.js --------------------------------工具类js
|  ├─assets --------项目公用资源目录(css，img)
|  |   ├─img  
|  |   |  ├─tabbar
|  |   |  |   ├─cart.svg
|  |   |  |   ├─cart_active.svg
|  |   |  |   ├─category.svg
|  |   |  |   ├─category_active.svg
|  |   |  |   ├─home.svg
|  |   |  |   ├─home_active.svg
|  |   |  |   ├─profile.svg
|  |   |  |   └profile_active.svg
|  |   |  ├─home
|  |   |  |  └recommend_bg.jpg
|  |   |  ├─detail
|  |   |  |   └detail_bottom.png
|  |   |  ├─common
|  |   |  |   ├─back.svg
|  |   |  |   ├─collect.svg
|  |   |  |   ├─placeholder.png
|  |   |  |   └top.png
|  |   |  ├─cart
|  |   |  |  └tick.svg
|  |   ├─css
|  |   |  ├─base.css ----------------------------项目基础css
|  |   |  ├─border.css --------------------------解决移动端1px边框的问题；
|  |   |  └normalize.css ------------------------项目初始化css
├─public ----------------------------------------公共部分
|   ├─favicon.png -------------------------------icon图标
|   └index.html ---------------------------------主页面,首页的模板
```


**5个界面：首页、详情页分类、购物车、我的（'我的'界面因为没有任何逻辑实现，暂时没写）**

>每个都是尽量封装成组件，便于调用，数据都是通过axios调用指定api接口，封装请求数据方法

1.界面主要内容
 * 首页栏有导航栏、轮播图、特征、推荐表、tab页（流行、新款、精选）以及tab页下的商品列表页

* 详情页有4个tab：商品、参数、评论、推荐，并根据
tab跳转，利用的是better-Scroll插件的scrollPosition监听位置并scrollTo指定位置；加入购物车可以把此商品加到购物车，并在页面中弹出toast

* 购物车界面主要全选按钮，合计选中商品价钱

* 分类界面左边是总的分类界面，右边是分类item的详细数据

* postcss.config.js里配置'postcss-px-to-viewport'插件，转换为视口单位vw

2.值得注意的知识点
* 路由懒加载 ```const xx=()=>{import('./xx') }```
* 图片懒加载 v-lazy
* 各种组件封装
* img加载完刷新refresh
* 上拉加载更多
* $refs调用组件（$refs.xx.$el）和元素
* ```@click.native``` 组件点击事件
* debounce防抖
* 事件总线```$bus.$emit```发送  ```$bus.$on```接收(先main.js中设置```Vue.prototype.$bus = new Vue()```vue实例是可以作为s事件总线的)
* created（在created中是不能拿到$refs的值的），mounted（created里异步请求数据，在mounted里数据还不一定到,），activated，deactivated几个重要的生命周期函数
* better-scroll的wrapper许设置百分比高度和``` overflow: hidden```;并且父组件设置```height：100vh```（因为100%是相对于父元素。要给父元素设定具体高度为100vh ！！）
* slot插槽利用
* flex布局
* 路由跳转 ```this.$router.push```，可携带参数 query，params
* 父子组件传值最好用小驼峰:```param-info```
* ```...mapGetters(["getCartList", "getLength"])```,映射vuex中的getters方法
* keep-alive保持组件不被销毁 ，再次进入时不被重新创建 exclude排除一些不用缓存的组价
* ```fastClick.attach(document.body)```解决移动端点击事件300ms延时
### 细节：
* 首页tab部分，因为better-Scroll让stick布局失效，所以得再放一个tab组件，v-show控制显示
* css3 中高度用calc()计算高度,符号之前必须有空格
```
widht: calc(12%+5em)就是错误的
widht: calc(12% + 5em)正确
```


 ### BUG：
 * tab不能keep-alive，一个tab滑动，另一个tab页内容也跟着滑动






## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



