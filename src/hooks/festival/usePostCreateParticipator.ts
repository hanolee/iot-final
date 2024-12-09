import { useMutation } from 'react-query'

import { postCreateParticipator, postParticipatorRequestType, postParticipatorResponseType } from '@/apis/festival/postCreateParticipator'

export default function usePostCreateParticipator() {
  return useMutation<postParticipatorResponseType, unknown, postParticipatorRequestType>(
    async({ festivalId, name, boothNumber, description, handledTea, country, tag, latitude, longitude }) => {
      return await postCreateParticipator({ festivalId, name, boothNumber, description, handledTea, country, tag, latitude, longitude })
    }
  )
}
