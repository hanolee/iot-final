import { Methods, request } from '@/libs/request'

export type PostFilterModel = {
  id: number;
  category: string;
  title: string;
  show: boolean;
  priority: number;
}

export type PostFiltersResponseType = PostFilterModel[]

export const getPostFilters = () => {
  return request<PostFiltersResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: '/post/admin/filter',
    method: Methods.GET
  })
}

