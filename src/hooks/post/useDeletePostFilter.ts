import { useMutation } from 'react-query'

import { deletePostFilter } from '@/apis/post/deletePostFilter'

export default function useDeletePostFilter() {
  return useMutation<void, unknown, { id: number }>(
    async ({ id }) => {
      await deletePostFilter(id)
    })
}
