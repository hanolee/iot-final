import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type PostCreateFilteredTeahouseType = {
  filterId: number;
  teahouseId: number;
}

const { TEAHOUSE } = ROUTER

export const postCreateFilteredTeahouse = async({ teahouseId, filterId }: PostCreateFilteredTeahouseType) => {
  return request<{ id: number }>({
    url: `${TEAHOUSE}/admin/filter/${filterId}/teahouse/${teahouseId}`,
    method: Methods.POST
  })
}
