import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { SHOPPING_ADMIN } = ROUTER

export const deleteProduct = async(productId: number) => {
  return request<{ id: number }>({
    url: `${SHOPPING_ADMIN}/product/${productId}`,
    method: Methods.DELETE
  })
}
