import { Methods, request } from '@/libs/request'

export const postMakeFront = (userId: number) => {
  return request<void>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `/user-admin/make-front/${userId}`,
    method: Methods.POST
  })
}
