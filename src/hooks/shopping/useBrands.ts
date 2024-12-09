import { useQuery } from 'react-query'

import { getBrands } from '@/apis/shopping/getBrands'

const getQueryKey = () => ['shopping-admin/brands']

export default function useBrands() {
  return useQuery(
    getQueryKey(),
    async () => {
      const data = await getBrands()
      return data
    }
  )
}
