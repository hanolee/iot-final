import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type postCreateTeahouseFilterType = {
  code: string;
  title: string;
  show: boolean;
  priority: number;
}

const { TEAHOUSE } = ROUTER

export const postCreateTeahouseFilter = async({ code, title, show, priority }: postCreateTeahouseFilterType) => {
  return request<{ id: number }>({
    url: `${TEAHOUSE}/admin/filter`,
    method: Methods.POST,
    data: { code, title, show, priority }
  })
}
