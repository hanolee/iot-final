import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type PostCreateShopType = {
  userId: number;
  name: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
}

const { SHOPPING_ADMIN } = ROUTER

export const postCreateShop = async ({ userId, name, deliveryFee, freeDeliveryThreshold }: PostCreateShopType) => {
  return request<{ id: number }>({
    url: `${SHOPPING_ADMIN}/shop/user/${userId}`,
    method: Methods.POST,
    data: { name, deliveryFee, freeDeliveryThreshold }
  })
}
