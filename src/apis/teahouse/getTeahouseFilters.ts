import { Methods, request } from '@/libs/request'

export type TeahouseFilterModel = {
  id: number;
  category: string;
  title: string;
  show: boolean;
  priority: number;
}

export type GetTeaHouseFilterResponseType = TeahouseFilterModel[]

export const getTeahouseFilters = () => {
  return request<GetTeaHouseFilterResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: '/teahouse/admin/filter',
    method: Methods.GET
  })
}

