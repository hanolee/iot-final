import { useQuery } from 'react-query'

import { getFestivals } from '@/apis/festival/getFestivals'

const getQueryKey = () => ['festival-admin']

export default function useFestivals(){
  return useQuery(
    getQueryKey(),
    async () => {
      const posts = await getFestivals()
      return posts
    }
  )
}
