import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'
import { PaginationDTO } from '@/types/PaginationDto'

export type GetProductsResponseType = ProductItemModel[];

export type ProductItemModel = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  price: number;
  summary: string;
  description: string;
  images: string[];
  detailImages: string[];
  shop: {
    id: number;
    name: string;
    owner: {
      id: number;
      handle: string;
      nickname: string;
      phoneNumber: string;
      code: number;
    };
  };
};

export const getProducts = (pagination: PaginationDTO) => {
  const { limit, page } = pagination
  return request<GetProductsResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${ROUTER.SHOPPING_ADMIN}/product?page=${page}&limit=${limit}`,
    method: Methods.GET
  })
}
