import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { TEAHOUSE } = ROUTER

export const deleteTeahouseFilter = async(id: number) => {
  return request<{ id: number }>({
    url: `${TEAHOUSE}/admin/filter/${id}`,
    method: Methods.DELETE
  })
}
