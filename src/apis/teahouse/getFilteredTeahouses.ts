import { Methods, request } from '@/libs/request'

export type FilteredTeahouseModel = {
  id: number;
  type: string;
  teahouseId: number;
}

export type GetFilteredTeahousesResponseType = FilteredTeahouseModel[]

export const getFilteredTeahouses = (teahouseId: number) => {
  return request<GetFilteredTeahousesResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `/teahouse/admin/filtered-teahouse/teahouse/${teahouseId}`,
    method: Methods.GET
  })
}

