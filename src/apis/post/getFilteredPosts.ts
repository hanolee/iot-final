import { Methods, request } from '@/libs/request'

export type FilteredPostModel = {
  id: number;
  type: string;
  postId: number;
}

export type GetFilteredTeahousesResponseType = FilteredPostModel[]

export const getFilteredPosts = (postId: number) => {
  return request<GetFilteredTeahousesResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `/post/admin/filtered-post/post/${postId}`,
    method: Methods.GET
  })
}

