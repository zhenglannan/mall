module.exports = {
  plugins: {
    //根据视口大小来调整宽度,1vw等于1/100视口宽度。
    'postcss-px-to-viewport': {
      // options
      // unitToConvert: 'px',
      viewportWidth: 375,//(Number) 设计稿的视口宽度
      // viewportHeight: 667,//(Number) 设计稿的视口高度
      unitPrecision: 5,// (Number) 单位转换后保留的精度
      // propList: ['*'],
      viewportUnit: 'vw',// (String) 希望使用的视口单位
      // fontViewportUnit: 'vw',
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//(Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      minPixelValue: 1,//(Number) 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false,// (Boolean) 媒体查询里的单位是否需要转换单位
      // replace: true,
      // exclude: [],
      // landscape: false,
      // landscapeUnit: 'vw',
      // landscapeWidth: 568
    }
  }
}