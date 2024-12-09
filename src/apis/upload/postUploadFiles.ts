import { Methods, request } from '@/libs/request'
import { ROUTER } from '@/router'

export type PostUploadFilesRequestType = {
  formData: FormData;
}

export type PostUploadFilesResponseType = {
  images: { id: number; image: string }[];
}

export const postUploadFiles = async({ formData }: PostUploadFilesRequestType) => request<PostUploadFilesResponseType>({
  url: `${ROUTER.UPLOAD_ADMIN}/multiple`,
  method: Methods.POST,
  data: formData
})
