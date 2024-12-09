import { useQuery } from 'react-query'

import { getTeaTogether } from '@/apis/tea-together/getTeaTogethers'

const getQueryKey = () => ['tea-together']

export default function useTeaTogether(){
  return useQuery(
    getQueryKey(),
    async () => {
      const teaTogethers = await getTeaTogether()
      return teaTogethers
    }
  )
}
