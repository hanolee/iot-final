import { useQuery } from 'react-query'

import { getPosts } from '@/apis/post/getPosts'

const getQueryKey = () => ['post/admin']

export default function usePosts(){
  return useQuery(
    getQueryKey(),
    async () => {
      const posts = await getPosts()
      return posts
    }
  )
}
