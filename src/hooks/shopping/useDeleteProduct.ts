import { useMutation } from 'react-query'

import { deleteProduct } from '@/apis/shopping/deleteProduct'

export default function useDeleteProduct () {
  return useMutation<void, unknown, number>(
    async(productId) => {
      await deleteProduct(productId)
    }
  )
}
