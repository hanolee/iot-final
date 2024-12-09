import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type Brand = {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
}

const { SHOPPING_ADMIN } = ROUTER

export const getBrands = () => {
  return request<Brand[]>({
    url: `${SHOPPING_ADMIN}/brand`,
    method: Methods.GET
  })
}
