import styled from '@emotion/styled'
import {
  Box,
  Button,
  Modal,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useDeleteFilteredTeahouse from '@/hooks/teahouse/useDeleteFilteredTeahouse'
import useFilteredTeahouses from '@/hooks/teahouse/useFilteredTeahouses'
import usePostApproveTeahouse from '@/hooks/teahouse/usePostApproveTeahouse'
import usePostCreateFilteredTeahouse from '@/hooks/teahouse/usePostCreateFilteredTeahouse'
import useTeahouseFilters from '@/hooks/teahouse/useTeahouseFilters'
import useTeahouses from '@/hooks/teahouse/useTeahouses'
import timeSince from '@/libs/timeSince'
import { ApprovementType } from '@/types/ApprovementType'

const TeahouseAdminPage = () => {
  const navigate = useNavigate()
  const { data: teahouses } = useTeahouses()
  const { mutate: approveTeahouse } = usePostApproveTeahouse()
  const approveTeahouseMemo = useCallback(approveTeahouse, [approveTeahouse])
  const sortedTeahouses = teahouses?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTeahouseIndex, setCurrentTeahouseIndex] = useState(0)
  const filterIndex = sortedTeahouses ? sortedTeahouses[currentTeahouseIndex].id : 0
  const { data: filteredTeahouses, isLoading } = useFilteredTeahouses(filterIndex)
  const { mutate: deleteFilteredTeahouse } = useDeleteFilteredTeahouse()
  const { mutate: createFilteredTeahouse } = usePostCreateFilteredTeahouse()
  const { data: filters } = useTeahouseFilters()

  const handleOpenModal = (index: number) => {
    setCurrentTeahouseIndex(index)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => setIsModalOpen(false)

  const handleNextTeahouse = () => {
    if (sortedTeahouses) setCurrentTeahouseIndex((prevIndex) => prevIndex === sortedTeahouses.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrevTeahouse = () => {
    if (sortedTeahouses) setCurrentTeahouseIndex((prevIndex) => prevIndex === 0 ? sortedTeahouses.length - 1 : prevIndex - 1
    )
  }

  const approveHandler = (id: number) => {
    approveTeahouseMemo({ approvementType: 'APPROVED', note: '승인 완료', id })
  }

  const rejectHandler = (id: number) => {
    approveTeahouseMemo({ approvementType: 'REJECTED', note: '존재하지 않는 티룸', id })
  }

  return (
    <PageWrapper>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}
      >
        <h1>Teahouse Admin</h1>
        <Button
          onClick={() => navigate('filter')}>필터 제작</Button>
      </div>
      <Button
        style={{ color: 'white', backgroundColor: '#01c897' }}
        onClick={() => handleOpenModal(0)}>찻집 - 필터</Button>
      <h1>찻집 목록</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>승인 상태</TableCell>
              <TableCell>생성일</TableCell>
              <TableCell>국가</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>위치</TableCell>
              <TableCell>승인</TableCell>
              <TableCell>반려</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTeahouses?.map((teahouse, index) => (
              <TableRow key={index}>
                <TableCell>{teahouse.id}</TableCell>
                <TableCell>
                  <TeahouseApprovementBadge approvementType={teahouse.approvementType} />
                </TableCell>
                <TableCell>{timeSince(teahouse.createdAt)}</TableCell>
                <TableCell>{teahouse.nation}</TableCell>
                <TableCell>
                  <b>{teahouse.name}</b>
                </TableCell>
                <TableCell>{teahouse.location}</TableCell>
                <TableCell width={100}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => approveHandler(teahouse.id)}>
                    승인하기
                  </Button>
                </TableCell>
                <TableCell width={100}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => rejectHandler(teahouse.id)}>
                    반려하기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <h2>찻집 정보</h2>
          {sortedTeahouses && (
            <div>
              <p><strong>ID:</strong> {sortedTeahouses[currentTeahouseIndex].id}</p>
              <p><strong>승인 상태:</strong> <TeahouseApprovementBadge approvementType={sortedTeahouses[currentTeahouseIndex].approvementType} /></p>
              <p><strong>생성일:</strong> {timeSince(sortedTeahouses[currentTeahouseIndex].createdAt)}</p>
              <p><strong>국가:</strong> {sortedTeahouses[currentTeahouseIndex].nation}</p>
              <p><strong>이름:</strong> {sortedTeahouses[currentTeahouseIndex].name}</p>
              <p><strong>위치:</strong> {sortedTeahouses[currentTeahouseIndex].location}</p>
              <div>
                {filters && filters.map((filter) => {
                  if (!isLoading){
                    const exists = filteredTeahouses?.some((ft) => ft.type === filter.category)
                    return (
                      <div key={filter.id}>
                        <Switch
                          checked={exists}
                          onClick={
                            async () => {
                              if (exists && filteredTeahouses) {
                                const filteredTeahouseToDelete = filteredTeahouses.find((ft) => ft.type === filter.category)
                                console.log(filteredTeahouseToDelete)
                                if (filteredTeahouseToDelete) deleteFilteredTeahouse({ id: filteredTeahouseToDelete.id })
                              } else {
                                await createFilteredTeahouse({ teahouseId: sortedTeahouses[currentTeahouseIndex].id, filterId: filter.id })
                              }
                            }
                          }
                        />
                        {filter.title}
                      </div>
                    )
                  }
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Button onClick={handlePrevTeahouse}>이전</Button>
                <Button onClick={handleNextTeahouse}>다음</Button>
              </div>
            </div>
          )}
          <div>
            <Button
              variant="contained"
              onClick={handleCloseModal}>
              닫기
            </Button>
          </div>
        </Box>
      </Modal>
    </PageWrapper>
  )
}

export default TeahouseAdminPage

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const PageWrapper = styled.div`
  padding: 60px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TeahouseApprovementBadgeWrapper = styled.div<{ approvementType: ApprovementType }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 5px;
  width: 50px;
  border-radius: 5px;
  font-size: 12px;
  color: #fff;
  background-color: ${({ approvementType }) => {
    if (approvementType == 'APPROVED') {
      return '#01c897'
    } else if (approvementType == 'PENDING') {
      return 'gray'
    } else {
      return 'orange'
    }
  }};
`

type TeahouseApprovementBadgeType = { approvementType: ApprovementType };

const TeahouseApprovementBadge = ({ approvementType }: TeahouseApprovementBadgeType) => {
  return (
    <TeahouseApprovementBadgeWrapper approvementType={approvementType}>
      {badgeText(approvementType)}
    </TeahouseApprovementBadgeWrapper>
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
