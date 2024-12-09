import { useMutation } from 'react-query'

import { patchFestival, PatchFestivalForAdminRequestDto } from '@/apis/festival/patchFestival'

export default function usePatchFestival(id: number) {
  return useMutation<void, unknown, PatchFestivalForAdminRequestDto>(
    async (data) => {
      await patchFestival(data, id)
    })
}
