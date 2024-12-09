import { useMutation } from 'react-query'

import { postCreateFilteredTeahouse, PostCreateFilteredTeahouseType } from '@/apis/teahouse/postCreateFilteredTeahouse'

export default function usePostCreateFilteredTeahouse() {
  return useMutation<void, unknown, PostCreateFilteredTeahouseType>(
    async ({ teahouseId, filterId }) => {
      await postCreateFilteredTeahouse({ teahouseId, filterId })
    })
}
