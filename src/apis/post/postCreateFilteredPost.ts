import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type PostCreateFilteredPostType = {
  filterId: number;
  postId: number;
}

const { POST } = ROUTER

export const postCreateFilteredPost = async({ postId, filterId }: PostCreateFilteredPostType) => {
  return request<{ id: number }>({
    url: `${POST}/admin/filter/${filterId}/post/${postId}`,
    method: Methods.POST
  })
}
