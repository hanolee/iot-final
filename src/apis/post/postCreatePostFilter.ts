import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type postCreatePostFilterType = {
  code: string;
  title: string;
  show: boolean;
  priority: number;
}

const { POST } = ROUTER

export const postCreatePostFilter = async({ code, title, show, priority }: postCreatePostFilterType) => {
  return request<{ id: number }>({
    url: `${POST}/admin/filter`,
    method: Methods.POST,
    data: { code, title, show, priority }
  })
}
