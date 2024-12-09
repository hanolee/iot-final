import { useMutation } from 'react-query'

import { postCreateProduct, PostCreateProductType } from '@/apis/shopping/postCreateProduct'

export default function usePostCreateProduct () {
  return useMutation<void, unknown, PostCreateProductType>(
    async(data) => {
      await postCreateProduct(data)
    }
  )
}
