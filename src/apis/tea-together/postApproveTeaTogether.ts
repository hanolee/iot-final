import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'
import { ApprovementType } from '@/types/ApprovementType'
import { getAccessToken } from '@/utils/jwt'

export type postApproveTeaTogetherType = {
  approvementType: ApprovementType;
  note: string;
  id: number;
}

const { TEATOGETHER } = ROUTER

export const postApproveTeaTogether = async({ approvementType, note, id }: postApproveTeaTogetherType) => {
  return request<{ id: number }>({
    url: `${TEATOGETHER}/${id}/approve`,
    method: Methods.POST,
    data: { approvementType, note },
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  })
}
