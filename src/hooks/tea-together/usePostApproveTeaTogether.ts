import { useMutation } from 'react-query'

import { postApproveTeaTogether, postApproveTeaTogetherType } from '@/apis/tea-together/postApproveTeaTogether'

export default function usePostApproveTeaTogether() {
  return useMutation<void, unknown, postApproveTeaTogetherType>(
    async ({
      approvementType,
      note,
      id
    }) => {
      await postApproveTeaTogether({ approvementType, note, id })
    })
}
