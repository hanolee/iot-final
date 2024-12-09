import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { POST } = ROUTER

export const deletePost = async(id: number) => {
  return request<{ id: number }>({
    url: `${POST}/admin/${id}`,
    method: Methods.DELETE
  })
}
