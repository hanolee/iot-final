import { useQuery } from 'react-query'

import { getShops } from '@/apis/shopping/getShops'

const getQueryKey = () => ['shopping-admin/shop']

export default function useShops(){
  return useQuery(
    getQueryKey(),
    async () => {
      const data = await getShops()
      return data
    }
  )
}
