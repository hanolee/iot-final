import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { FESTIVAL_ADMIN } = ROUTER

export type GetFestivalsDetailResponseType = {
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
  participators: ParticipatorModel[];
  facilities: Facility[];
  images: { id: number; image: string }[];
}

interface Facility {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  type: string;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

// 부스 정보 타입
export type ParticipatorModel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  boothNumber: number;
  name: string;
  description: string;
  handledTea: string;
  tag: string;
  latitude: string;
  longitude: string;
  country: string;
}

export const getFestivalById = (id: number) => {
  return request<GetFestivalsDetailResponseType>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${FESTIVAL_ADMIN}/${id}`,
    method: Methods.GET
  })
}
