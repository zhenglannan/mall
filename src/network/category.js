import {request} from './request';

export function getCategory(){
  return request({
    url:'/api/h3/category'
  })
}

export function getSubcategory(maitKey){
  return request({
    url:'/api/h3/subcategory',
    params:{
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey,type){
  return request({
    url:'/api/h3/subcategory/detail',
    params:{
      miniWallkey,
      type
    }
  })
}