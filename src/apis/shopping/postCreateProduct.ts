import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type PostCreateProductType = {
  userId: number;
  shopId: number;
  brandId: number;
  name: string;
  price: number;
  summary: string;
  description: string;
  imageIds: number[];
  detailImageIds: number[];
}

const { SHOPPING_ADMIN } = ROUTER

export const postCreateProduct = async (data: PostCreateProductType) => {
  return request<{ id: number }>({
    url: `${SHOPPING_ADMIN}/product?shopId=${data.shopId}&brandId=${data.brandId}&userId=${data.userId}`,
    method: Methods.POST,
    data: {
      name: data.name,
      price: data.price,
      summary: data.summary,
      description: data.description,
      imageIds: data.imageIds,
      detailImageIds: data.detailImageIds
    }
  })
}
