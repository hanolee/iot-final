import { useMutation } from 'react-query'

import { deletePost } from '@/apis/post/deletePostForAdmin'

export default function useDeletePost() {
  return useMutation<void, unknown, { id: number }>(
    async ({ id }) => {
      await deletePost(id)
    })
}
