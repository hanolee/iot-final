import { Methods, request } from '@/libs/request'

export const postChangeUser = (userId: number) => {
  return request<void>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `/user-admin/change-user/${userId}`,
    method: Methods.POST
  })
}
