import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { TEAHOUSE } = ROUTER

export const deleteFilteredTeahouse = async(id: number) => {
  return request<{ id: number }>({
    url: `${TEAHOUSE}/admin/filtered-teahouse/${id}`,
    method: Methods.DELETE
  })
}
