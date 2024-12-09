import { useMutation } from 'react-query'

import { deleteFilteredPost } from '@/apis/post/deleteFilteredPost'

export default function useDeleteFilteredPost() {
  return useMutation<void, unknown, { id: number }>(
    async ({ id }) => {
      await deleteFilteredPost(id)
    })
}
