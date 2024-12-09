import { useQuery } from 'react-query'

import { getTeahouses } from '@/apis/teahouse/getTeahouses'

const getQueryKey = () => ['teahouse/admin']

export default function useTeahouses(){
  return useQuery(
    getQueryKey(),
    async () => {
      const teahouses = await getTeahouses()
      return teahouses
    }
  )
}
