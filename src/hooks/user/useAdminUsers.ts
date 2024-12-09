import { useQuery } from 'react-query'

import { getAdminUsers } from '@/apis/user/getAdminUsers'

const getQueryKey = () => ['admin-user']

export default function useAdminUsers(){
  return useQuery(
    getQueryKey(),
    async () => {
      const data = await getAdminUsers()
      return data
    }
  )
}
