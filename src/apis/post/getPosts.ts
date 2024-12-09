import { Methods, request } from '@/libs/request'

export type GetPostsResponseType = PostItemModel[];

export type PostItemModel = {
  id: number;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export const getPosts = () => {
  return request<GetPostsResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: '/post/admin',
    method: Methods.GET
  })
}
