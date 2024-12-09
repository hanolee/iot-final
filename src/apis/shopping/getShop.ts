import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

import { ShopItemModel } from './getShops'

export type GetShopResponseType = ShopItemModel;

export const getShop = (shopId: number) => {
  return request<GetShopResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${ROUTER.SHOPPING_ADMIN}/shop/${shopId}`,
    method: Methods.GET
  })
}
