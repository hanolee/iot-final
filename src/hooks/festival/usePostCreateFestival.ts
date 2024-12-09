import { useMutation } from 'react-query'

import { CreateFestivalForAdminRequestDto, postCreateFestival } from '@/apis/festival/postCreateFestival'

export default function usePostCreateFestival() {
  return useMutation<void, unknown, CreateFestivalForAdminRequestDto>(
    async (data) => {
      await postCreateFestival(data)
    })
}
