import { useMutation } from 'react-query'

import { postUploadFiles, PostUploadFilesResponseType } from '@/apis/upload/postUploadFiles' // 경로를 적절하게 수정해주세요.

export default function usePostUploadFiles() {
  return useMutation<PostUploadFilesResponseType, Error, File[]>(
    async (files: File[]) => {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i])
      }
      return postUploadFiles({ formData })
    }
  )
}
