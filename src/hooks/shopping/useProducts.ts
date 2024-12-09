import { useQuery } from 'react-query'

import { getProducts } from '@/apis/shopping/getProducts'
import { PaginationDTO } from '@/types/PaginationDto'

const getQueryKey = () => ['products']

export default function useProducts(paginationDTO: PaginationDTO){
  return useQuery(
    getQueryKey(),
    async () => {
      const response = await getProducts(paginationDTO)
      return response
    }
  )
}
