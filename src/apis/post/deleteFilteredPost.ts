import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { POST } = ROUTER

export const deleteFilteredPost = async(id: number) => {
  return request<{ id: number }>({
    url: `${POST}/admin/filtered-post/${id}`,
    method: Methods.DELETE
  })
}
