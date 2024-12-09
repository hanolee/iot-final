import { useMutation } from 'react-query'

import { deleteTeahouseFilter } from '@/apis/teahouse/deleteTeahouseFilter'

export default function useDeleteTeahouseFilter() {
  return useMutation<void, unknown, { id: number }>(
    async ({ id }) => {
      await deleteTeahouseFilter(id)
    })
}
