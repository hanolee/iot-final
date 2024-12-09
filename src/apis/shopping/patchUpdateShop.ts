import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type UpdateShopType = {
  name?: string;
  deliveryFee?: number;
  freeDeliveryThreshold?: number;
}

export const patchUpdateShop = async (shopId: number, data: UpdateShopType) => {
  return request({
    url: `${ROUTER.SHOPPING_ADMIN}/shop/${shopId}`,
    method: Methods.PATCH,
    data
  })
}
