import { useMutation, useQueryClient } from 'react-query'

import { postCreateShop, PostCreateShopType } from '@/apis/shopping/postCreateShop'

export default function usePostCreateShop() {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, PostCreateShopType>(
    async ({ userId, name, deliveryFee, freeDeliveryThreshold }) => {
      await postCreateShop({ userId, name, deliveryFee, freeDeliveryThreshold })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('shopping-admin/shop')
      }
    }
  )
}
