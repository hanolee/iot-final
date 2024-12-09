import { useMutation } from 'react-query'

import { deleteParticipator } from '@/apis/festival/deleteParticipator'

export default function useDeleteParticipator() {
  return useMutation<void, unknown, { festivalId: number; participatorId: number }>(
    async ({ festivalId, participatorId }) => {
      await deleteParticipator(festivalId, participatorId)
    })
}
