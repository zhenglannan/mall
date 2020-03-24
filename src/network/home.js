import {request} from './request';

export function getHomeMultidata(){
  return request({
    url:'/api/wh/home/multidata'
  })
}