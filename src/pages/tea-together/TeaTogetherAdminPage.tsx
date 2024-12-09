import styled from '@emotion/styled'
import { useCallback } from 'react'

import usePostApproveTeaTogether from '@/hooks/tea-together/usePostApproveTeaTogether'
import useTeaTogether from '@/hooks/tea-together/useTeaTogethers'
import timeSince from '@/libs/timeSince'
import { ApprovementType } from '@/types/ApprovementType'

const TeaTogetherAdminPage = () => {
  const { data: teaTogethers } = useTeaTogether()
  const { mutate: approveTeaTogether } = usePostApproveTeaTogether()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const approveTeaTogetherMemo = useCallback(approveTeaTogether, [approveTeaTogether])
  const sortedTeaTogether = teaTogethers?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  function approveHandler(id: number) {
    approveTeaTogetherMemo({ approvementType: 'APPROVED', note: '승인 완료', id })
  }
  function rejectHandler(id: number) {
    approveTeaTogetherMemo({ approvementType: 'REJECTED', note: '존재하지 않는 티룸', id })
  }
  return (
    <PageWrapper>
      <h1>찻집, 공간 승인 관련</h1>
      {sortedTeaTogether?.map((teaTogether, index) => {
        return (
          <>
            <TeaTogetherWrapper key={index}>
              <span>{teaTogether.id}</span>
              <TeaTogetherApprovementBadge approvementType={teaTogether.approvementType} />
              <span>{timeSince(teaTogether.createdAt)}</span>
              <span>{teaTogether.category}</span>
              <span><b>{teaTogether.title}</b></span>
              <span>{teaTogether.description}</span>
              <span>{teaTogether.participationFee}</span>
              <span>{teaTogether.makerName}</span>
              <span>{teaTogether.minimumSeats}</span>
              <span>{teaTogether.seats}</span>
              <span>{teaTogether.city}</span>
              <span>{teaTogether.hostContact}</span>
              <span>{teaTogether.hostDescription}</span>
              <span>{teaTogether.hostName}</span>
              <button onClick={() => approveHandler(teaTogether.id)}>승인하기</button>
              <button onClick={() => rejectHandler(teaTogether.id)}>반려하기</button>
            </TeaTogetherWrapper>
            <TeaTogetherImageWrapper>
              {teaTogether.images?.map((image, index) => (<TeaTogetherImage
                src={image}
                key={index} />))}
            </TeaTogetherImageWrapper>
          </>
        )
      })}
    </PageWrapper>
  )
}
export default TeaTogetherAdminPage

const PageWrapper = styled.div`
  padding: 60px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const TeaTogetherWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  > span {
    font-size: 10px;
    max-width: 300px;
  }
`

const TeaTogetherImageWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 5px;
`
const TeaTogetherImage = styled.img`
  width: 50px;
  height: 50px;
`

const TeaTogetherApprovementBadgeWrapper = styled.div<{ approvementType: ApprovementType }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 12px;
  background-color: ${({ approvementType }) => {
    if (approvementType == 'APPROVED') {
      return 'green'
    } else if (approvementType == 'PENDING') {
      return 'gray'
    } else {
      return 'orange'
    }
  }}; 
`
type TeaTogetherApprovementBadgeType = { approvementType: ApprovementType }
const TeaTogetherApprovementBadge = ({ approvementType }: TeaTogetherApprovementBadgeType) => {
  return (
    <TeaTogetherApprovementBadgeWrapper approvementType={approvementType}>
      {badgeText(approvementType)}
    </TeaTogetherApprovementBadgeWrapper>
  )
}
const badgeText = (approvementType: ApprovementType) => {
  if (approvementType == 'APPROVED') {
    return '승인 완료'
  } else if (approvementType == 'PENDING') {
    return '대기 중'
  } else {
    return '반려됨'
  }
}
