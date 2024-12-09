import { useMutation } from 'react-query'

import { postMakeFront } from './../../apis/user/postMakeFront'

export default function usePostMakeFront() {
  return useMutation<void, unknown, { userId: number }>(
    async ({ userId }) => {
      await postMakeFront(userId)
    })
}
