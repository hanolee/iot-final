import { useQuery } from 'react-query'

import { getTeahouseFilters } from '@/apis/teahouse/getTeahouseFilters'

const getQueryKey = () => ['teahouse/filter']

export default function useTeahouseFilters(){
  return useQuery(
    getQueryKey(),
    async () => {
      const filters = await getTeahouseFilters()
      return filters
    }
  )
}
