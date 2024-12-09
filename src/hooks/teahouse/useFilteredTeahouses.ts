import { useQuery } from 'react-query'

import { getFilteredTeahouses } from '@/apis/teahouse/getFilteredTeahouses'

const getQueryKey = (teahouseId: number) => [`teahouse/filtered-teahouse/teahouse/${teahouseId}`]

export default function useFilteredTeahouses(teahouseId: number){
  return useQuery(
    getQueryKey(teahouseId),
    async () => {
      const filteredTeahouses = await getFilteredTeahouses(teahouseId)
      return filteredTeahouses
    }
  )
}
