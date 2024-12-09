import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

import { ProductItemModel } from './getProducts'

export const getProduct = (id: number) => {
  return request<ProductItemModel>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${ROUTER.SHOPPING_ADMIN}/product/${id}`,
    method: Methods.GET
  })
}
