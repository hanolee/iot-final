import { Button, CircularProgress, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TeahouseFilterModel } from '@/apis/teahouse/getTeahouseFilters'
import useDeleteTeahouseFilter from '@/hooks/teahouse/useDeleteTeahouseFilter'
import usePatchTeahouseFilter from '@/hooks/teahouse/usePatchTeahouseFilter'
import useTeahouseFilters from '@/hooks/teahouse/useTeahouseFilters'

const TeahouseFilterPage = () => {
  const navigate = useNavigate()
  const { data: filters, isLoading, refetch } = useTeahouseFilters()
  console.log(filters)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>찻집 필터 페이지</h1>
      <Button onClick={() => navigate('create')}>필터 만들기</Button>
      <h1>현재 필터</h1>
      {isLoading && <CircularProgress />}
      <TableContainer
        component={Paper}
        style={{ maxWidth: 800 }}>
        <Table aria-label="teahouse filters table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Show</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filters && filters.map((filter) => (
              <TeahouseFilter
                key={filter.id}
                refresh={refetch}
                filter={filter} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default TeahouseFilterPage

type TeahouseFilterProps = { filter: TeahouseFilterModel; refresh: () => void };
const TeahouseFilter = ({ filter, refresh }: TeahouseFilterProps) => {
  const { mutate: patchTeahouseFilter } = usePatchTeahouseFilter()
  const { mutate: deleteFilter } = useDeleteTeahouseFilter()
  const [show, setShow] = useState(filter.show)
  const [edit, setEdit] = useState(false)

  const handleSwitchChange = async () => {
    try {
      await patchTeahouseFilter({ ...filter, show: !show })
      setShow(!show)
      refresh()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TableRow>
      <TableCell>{filter.id}</TableCell>
      <TableCell>{filter.category}</TableCell>
      <TableCell>{filter.title}</TableCell>
      <TableCell>
        <Switch
          checked={show}
          onChange={handleSwitchChange}
        />
      </TableCell>
      <TableCell>{filter.priority}</TableCell>
      <TableCell>
        <Button onClick={async () => {
          await deleteFilter({ id: filter.id })
          refresh()
        }}>삭제</Button>
        {(!edit) && <Button onClick={() => setEdit(true)}>수정</Button>}
        {(edit) && <Button onClick={() => setEdit(false)}>완료</Button>}
      </TableCell>
    </TableRow>
  )
}
