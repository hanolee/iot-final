import { useMutation } from 'react-query'
import { patchUpdateBrand } from '@/apis/shopping/patchUpdateBrand'
import { PostCreateBrandType } from '@/apis/shopping/postCreateBrand'

export default function usePatchUpdateBrand(id: number) {
  return useMutation<void, unknown, Partial<PostCreateBrandType>>(
    async (data) => {
      await patchUpdateBrand(id, data)
    }
  )
} 
