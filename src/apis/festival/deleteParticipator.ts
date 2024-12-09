import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { FESTIVAL_ADMIN } = ROUTER

export const deleteParticipator = (festivalId: number, participatorId: number) => {
  return request<void>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${FESTIVAL_ADMIN}/${festivalId}/participator/${participatorId}`,
    method: Methods.DELETE
  })
}
