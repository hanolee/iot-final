import { Methods, request } from '@/libs/request'

export type GetAdminUsersResponseType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string | null;
  password: string | null;
  handle: string;
  phoneNumber: string;
  nickname: string;
  description: string;
  birth: string | null;
  gender: string | null;
  code: number;
  deleteRequestAt: string | null;
}[]

export const getAdminUsers = () => {
  return request<GetAdminUsersResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: '/user-admin',
    method: Methods.GET
  })
}
