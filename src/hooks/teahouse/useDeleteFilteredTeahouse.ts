import { useMutation } from 'react-query'

import { deleteFilteredTeahouse } from '@/apis/teahouse/deleteFilteredTeahouse'

export default function useDeleteFilteredTeahouse() {
  return useMutation<void, unknown, { id: number }>(
    async ({ id }) => {
      await deleteFilteredTeahouse(id)
    })
}
