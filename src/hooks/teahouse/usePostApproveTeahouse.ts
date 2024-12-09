import { useMutation } from 'react-query'

import { postApproveTeahouse, postApproveTeahouseType } from '@/apis/teahouse/postApproveTeahouse'

export default function usePostApproveTeahouse() {
  return useMutation<void, unknown, postApproveTeahouseType>(
    async ({
      approvementType,
      note,
      id
    }) => {
      await postApproveTeahouse({ approvementType, note, id })
    })
}
