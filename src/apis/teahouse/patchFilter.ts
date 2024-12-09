import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type patchTeahouseFilterType = {
  id: number;
  category: string;
  title: string;
  show: boolean;
  priority: number;
}

const { TEAHOUSE } = ROUTER

export const patchTeahouseFilter = async({ id, category, title, show, priority }: patchTeahouseFilterType) => {
  return request<{ id: number }>({
    url: `${TEAHOUSE}/admin/filter/${id}`,
    method: Methods.PATCH,
    data: { category, title, show, priority }
  })
}
