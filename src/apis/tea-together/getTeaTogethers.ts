import { Methods, request } from '@/libs/request'
import { ApprovementType } from '@/types/ApprovementType'

export type GetTeaTogethersResponseDto = {
  id: number;
  category: string;
  createdAt: string;
  title: string;
  approvementType: ApprovementType;
  city: string;
  makerName: string;
  summary: string;
  description: string;
  participationFee: number;
  seats: number;
  minimumSeats: number;
  rooms: TeaTogetherRoomDto[];
  images: string[];
  hostName: string;
  hostDescription: string;
  hostContact: string;
  teahouseId: number;
}[]
export type TeaTogetherRoomDto = {
  roomId: number;
  times: TeaTogetherTimeDto[];
}

export type TeaTogetherTimeDto = {
  startAt: Date;
  endAt: Date;
}

export const getTeaTogether = () => {
  return request<GetTeaTogethersResponseDto>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: '/tea-together/admin',
    method: Methods.GET
  })
}
