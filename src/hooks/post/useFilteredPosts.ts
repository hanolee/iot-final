import { useQuery } from 'react-query'

import { getFilteredPosts } from '@/apis/post/getFilteredPosts'

const getQueryKey = (postId: number) => [`post/filtered-teahouse/post/${postId}`]

export default function useFilteredPosts(postId: number){
  return useQuery(
    getQueryKey(postId),
    async () => {
      const filteredPosts = await getFilteredPosts(postId)
      return filteredPosts
    }
  )
}
