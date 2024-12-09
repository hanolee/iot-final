import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

import { PostCreateBrandType } from './postCreateBrand'

const { SHOPPING_ADMIN } = ROUTER

export const patchUpdateBrand = (id: number, data: Partial<PostCreateBrandType>) => {
  return request({
    url: `${SHOPPING_ADMIN}/brand/${id}`,
    method: Methods.PATCH,
    data
  })
}
