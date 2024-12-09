import { useQuery } from 'react-query'

import { getFestivalById } from '@/apis/festival/getFestival'

const getQueryKey = (id: number) => [`festival-admin/${id}`]

export default function useFestivalById(id: number){
  return useQuery(
    getQueryKey(id),
    async () => {
      const festival = await getFestivalById(id)
      return festival
    }
  )
}
