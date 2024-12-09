import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type PostCreateBrandType = {
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive?: boolean;
}

const { SHOPPING_ADMIN } = ROUTER

export const postCreateBrand = (data: PostCreateBrandType) => {
  return request<{ id: number }>({
    url: `${SHOPPING_ADMIN}/brand`,
    method: Methods.POST,
    data
  })
}
