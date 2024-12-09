import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { FESTIVAL_ADMIN } = ROUTER

export const deleteFacility = (festivalId: number, facilityId: number) => {
  return request<void>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${FESTIVAL_ADMIN}/${festivalId}/facility/${facilityId}`,
    method: Methods.DELETE
  })
}
