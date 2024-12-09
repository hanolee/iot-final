import { useMutation } from 'react-query'

import { deleteFestivalImage } from '@/apis/festival/deleteFestivalImage'

export default function useDeleteFestivalImage() {
  return useMutation<void, unknown, { festivalId: number; imageId: number }>(
    async ({ festivalId, imageId }) => {
      await deleteFestivalImage(festivalId, imageId)
    })
}
