import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type GetShopsResponseType = ShopItemModel[];

export type ShopItemModel = {
  id: number;
  name: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  owner: {
    id: number;
    handle: string;
    phoneNumber: string;
    nickname: string;
  };
};

export const getShops = () => {
  return request<GetShopsResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${ROUTER.SHOPPING_ADMIN}/shop`,
    method: Methods.GET
  })
}
