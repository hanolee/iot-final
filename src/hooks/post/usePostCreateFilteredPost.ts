import { useMutation } from 'react-query'

import { postCreateFilteredPost, PostCreateFilteredPostType } from '@/apis/post/postCreateFilteredPost'

export default function usePostCreateFilteredPost() {
  return useMutation<void, unknown, PostCreateFilteredPostType>(
    async ({ postId, filterId }) => {
      await postCreateFilteredPost({ postId, filterId })
    })
}
