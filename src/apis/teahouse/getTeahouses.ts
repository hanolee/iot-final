import { Methods, request } from '@/libs/request'
import { ApprovementType } from '@/types/ApprovementType'

export type GetTeaHousesResponseType = {
  id: number;
  name: string;
  location: string;
  specificLocation: string;
  city: string;
  subCity: string;
  latitude: string;
  longitude: string;
  finderName: string;
  finderUserId: string;
  nation: string;
  createdAt: string;
  approvementType: ApprovementType;
}[]

export const getTeahouses = () => {
  return request<GetTeaHousesResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: '/teahouse/admin',
    method: Methods.GET
  })
}
