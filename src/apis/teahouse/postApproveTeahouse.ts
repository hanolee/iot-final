import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'
import { ApprovementType } from '@/types/ApprovementType'
import { getAccessToken } from '@/utils/jwt'

export type postApproveTeahouseType = {
  approvementType: ApprovementType;
  note: string;
  id: number;
}

const { TEAHOUSE } = ROUTER

export const postApproveTeahouse = async({ approvementType, note, id }: postApproveTeahouseType) => {
  return request<{ id: number }>({
    url: `${TEAHOUSE}/${id}/approve`,
    method: Methods.POST,
    data: { approvementType, note },
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  })
}
