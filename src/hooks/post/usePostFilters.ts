import { useQuery } from 'react-query'

import { getPostFilters } from '@/apis/post/getPostFilters'

const getQueryKey = () => ['post/admin/filter']

export default function usePostFilters(){
  return useQuery(
    getQueryKey(),
    async () => {
      const filters = await getPostFilters()
      return filters
    }
  )
}
