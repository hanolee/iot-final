import { useMutation } from 'react-query'

import { postCreateTeahouseFilter, postCreateTeahouseFilterType } from '@/apis/teahouse/postCreateTeahouseFilters'

export default function usePostCreateTeahouseFilter() {
  return useMutation<void, unknown, postCreateTeahouseFilterType>(
    async ({
      code,
      title,
      show,
      priority
    }) => {
      await postCreateTeahouseFilter({ code, title, show, priority })
    })
}
