import { useMutation } from 'react-query'

import { postCreateBrand, PostCreateBrandType } from '@/apis/shopping/postCreateBrand'

export default function usePostCreateBrand() {
  return useMutation<{ id: number }, unknown, PostCreateBrandType>(
    async (data) => {
      return await postCreateBrand(data)
    }
  )
}
