import { useQuery } from 'react-query'

import { getShop } from '@/apis/shopping/getShop'

const getQueryKey = (shopId: number) => [`shopping-admin/shop/${shopId}`]

export default function useShop(shopId: number){
  return useQuery(
    getQueryKey(shopId),
    async () => {
      const data = await getShop(shopId)
      return data
    }
  )
}
