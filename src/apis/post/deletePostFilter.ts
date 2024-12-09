import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { POST } = ROUTER

export const deletePostFilter = async(id: number) => {
  return request<{ id: number }>({
    url: `${POST}/admin/filter/${id}`,
    method: Methods.DELETE
  })
}
