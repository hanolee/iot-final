import { useMutation } from 'react-query'

import { patchTeahouseFilter, patchTeahouseFilterType } from '@/apis/teahouse/patchFilter'

export default function usePatchTeahouseFilter() {
  return useMutation<void, unknown, patchTeahouseFilterType>(
    async ({
      id,
      category,
      title,
      show,
      priority
    }) => {
      await patchTeahouseFilter({ category, title, show, priority, id })
    })
}
