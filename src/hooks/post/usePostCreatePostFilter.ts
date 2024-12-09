import { useMutation } from 'react-query'

import { postCreatePostFilter, postCreatePostFilterType } from '@/apis/post/postCreatePostFilter'

export default function usePostCreatePostFilter() {
  return useMutation<void, unknown, postCreatePostFilterType>(
    async ({
      code,
      title,
      show,
      priority
    }) => {
      await postCreatePostFilter({ code, title, show, priority })
    })
}
