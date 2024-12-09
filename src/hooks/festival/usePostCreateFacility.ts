import { useMutation } from 'react-query'

import { postCreateFacility, PostCreateFacilityRequestType } from '@/apis/festival/postCreateFacility'

export default function usePostCreateFacility(festivalId: number) {
  return useMutation<void, unknown, PostCreateFacilityRequestType>(
    async (data) => {
      await postCreateFacility(festivalId, data)
    })
}
