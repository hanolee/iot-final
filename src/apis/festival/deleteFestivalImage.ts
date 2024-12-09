import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

const { FESTIVAL_ADMIN } = ROUTER

export const deleteFestivalImage = (festivalId: number, imageId: number) => {
  return request<void>({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    url: `${FESTIVAL_ADMIN}/${festivalId}/image/${imageId}`,
    method: Methods.DELETE
  })
}
