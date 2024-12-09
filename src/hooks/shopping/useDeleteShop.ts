import { useMutation } from 'react-query'

import { deleteShop } from '@/apis/shopping/deleteShop'

export default function useDeleteShop () {
  return useMutation<void, unknown, number>(
    async(shopId) => {
      await deleteShop(shopId)
    }
  )
}
