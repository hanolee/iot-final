import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { FESTIVAL_ADMIN } = ROUTER

export type PostCreateFacilityRequestType = {
  type: string;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

export const postCreateFacility = async(festivalId: number, data: PostCreateFacilityRequestType) => request<void>({
  url: `${FESTIVAL_ADMIN}/${festivalId}/facility`,
  method: Methods.POST,
  data: data
})
