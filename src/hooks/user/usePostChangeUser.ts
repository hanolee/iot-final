import { useMutation } from 'react-query'

import { postChangeUser } from '@/apis/user/postChangeUser'

export default function usePostChangeUser() {
  return useMutation<void, unknown, { userId: number }>(
    async ({ userId }) => {
      await postChangeUser(userId)
    })
}
