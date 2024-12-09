import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type PatchFestivalForAdminRequestDto = {
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
  year: number;
  title: string;
  description: string;
  tag: string;
  summary: string;
  participationFee: number;
  visible: boolean;
  reservationAvaliable: boolean;
  reservationType: string;
  openedAt: Date;
  expiredAt: Date;
}

const { FESTIVAL_ADMIN } = ROUTER

export const patchFestival = async(patchFestivalForAdminRequestDto: PatchFestivalForAdminRequestDto, id: number) => {
  return request<void>({
    url: `${FESTIVAL_ADMIN}/${id}`,
    method: Methods.PATCH,
    data: patchFestivalForAdminRequestDto
  })
}
