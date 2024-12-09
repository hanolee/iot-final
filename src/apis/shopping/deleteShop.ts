import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { SHOPPING_ADMIN } = ROUTER

export const deleteShop = async(shopId: number) => {
  return request<{ id: number }>({
    url: `${SHOPPING_ADMIN}/shop/${shopId}`,
    method: Methods.DELETE
  })
}
