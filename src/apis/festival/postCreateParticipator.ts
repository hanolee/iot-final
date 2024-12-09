import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { FESTIVAL_ADMIN } = ROUTER

export type postParticipatorRequestType = {
  festivalId: number;
  name: string;
  boothNumber: number;
  description: string;
  handledTea: string;
  country: 'KR' | 'CN' | 'JP' | 'LK' | 'TW' | 'US';
  tag: string;
  latitude: string;
  longitude: string;
}

export type postParticipatorResponseType = {
  participatorId: number;
  boothNumber: number;
  name: string;
  tag: string;
}

export const postCreateParticipator = async({ festivalId, name, boothNumber, description, handledTea, country, tag, latitude, longitude }: postParticipatorRequestType) => request<postParticipatorResponseType>({
  url: `${FESTIVAL_ADMIN}/${festivalId}/participator`,
  method: Methods.POST,
  data: { name, boothNumber, description, handledTea, country, tag, latitude, longitude }
})
