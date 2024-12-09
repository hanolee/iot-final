import { useMutation } from 'react-query'

import { deleteFacility } from '@/apis/festival/deleteFacility'

export default function useDeleteFacility() {
  return useMutation<void, unknown, { festivalId: number; facilityId: number }>(
    async ({ festivalId, facilityId }) => {
      await deleteFacility(festivalId, facilityId)
    })
}
