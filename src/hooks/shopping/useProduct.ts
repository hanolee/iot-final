import { useQuery } from 'react-query'

import { getProduct } from '@/apis/shopping/getProduct'

const getQueryKey = (id: number) => [`product/${id}`]

export default function useProduct(id: number){
  return useQuery(
    getQueryKey(id),
    async () => {
      const response = await getProduct(id)
      return response
    }
  )
}
