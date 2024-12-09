import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type GetFestivalsResponseType = FestivalItemModel[];

const { FESTIVAL_ADMIN } = ROUTER

export type FestivalItemModel = {
  id: number;
  title: string;
  year: number;
  tag: string;
  description: string;
  summary: string;
  participationFee: number;
  reservationAvaliable: boolean;
  reservationType: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  location: string;
  locationLocal: string;
  specificLocation: string;
  nation: string;
  city: string;
  cityLocal: string;
  subCity: string;
  subCityLocal: string;
  longitude: string;
  latitude: string;
  visible: boolean;
  openedAt: string;
  expiredAt: string;
}

export const getFestivals = () => {
  return request<GetFestivalsResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${FESTIVAL_ADMIN}`,
    method: Methods.GET
  })
}
