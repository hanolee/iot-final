import { useMutation } from 'react-query'

import { patchPostFilter, PatchPostFilterType } from '@/apis/post/patchPostFilter'

export default function usePatchPostFilter() {
  return useMutation<void, unknown, PatchPostFilterType>(
    async ({
      id,
      category,
      title,
      show,
      priority
    }) => {
      await patchPostFilter({ category, title, show, priority, id })
    })
}
