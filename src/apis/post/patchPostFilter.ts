import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type PatchPostFilterType = {
  id: number;
  category: string;
  title: string;
  show: boolean;
  priority: number;
}

const { POST } = ROUTER

export const patchPostFilter = async({ id, category, title, show, priority }: PatchPostFilterType) => {
  return request<{ id: number }>({
    url: `${POST}/admin/filter/${id}`,
    method: Methods.PATCH,
    data: { category, title, show, priority }
  })
}
