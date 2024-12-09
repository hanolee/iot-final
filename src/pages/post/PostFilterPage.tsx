import { Button, CircularProgress, Switch, TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PostFilterModel } from '@/apis/post/getPostFilters'
import useDeletePostFilter from '@/hooks/post/useDeletePostFilter'
import usePatchPostFilter from '@/hooks/post/usePatchPostFilter'
import usePostFilters from '@/hooks/post/usePostFilters'

const PostFilterPage = () => {
  const { data: filters, isLoading, refetch } = usePostFilters()
  const navigate = useNavigate()
  return (
    <div>
      <h1>글 필터</h1>
      <Button onClick={() => navigate('create')}>생성</Button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(isLoading) ? <CircularProgress /> : filters?.map((filter) => (<PostFilter
          key={filter.id}
          refresh={() => refetch()}
          filter={filter} />))}
      </div>
    </div>
  )
}
export default PostFilterPage

type PostFilterProps = { filter: PostFilterModel; refresh: () => void };
const PostFilter = ({ filter, refresh }: PostFilterProps) => {
  const { mutate: patchTeahouseFilter } = usePatchPostFilter()
  const { mutate: deleteFilter } = useDeletePostFilter()
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
