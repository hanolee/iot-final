import { useMutation, useQueryClient } from 'react-query'

import { patchUpdateShop, UpdateShopType } from '@/apis/shopping/patchUpdateShop'

type MutationParams = {
  shopId: number;
  data: UpdateShopType;
}

export default function useUpdateShop() {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, MutationParams>(
    async ({ shopId, data }) => {
      await patchUpdateShop(shopId, data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('shopping-admin/shop')
      }
    }
  )
}
