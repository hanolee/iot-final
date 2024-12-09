import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { postCreateTeahouseFilterType } from '@/apis/teahouse/postCreateTeahouseFilters'
import usePostCreateTeahouseFilter from '@/hooks/teahouse/usePostCreateTeahouseFilters'

const TeahouseFilterCreatePage = () => {
  const navigate = useNavigate()
  const { mutate } = usePostCreateTeahouseFilter()
  const [filterData, setFilterData] = useState<postCreateTeahouseFilterType>({ code: '', title: '', show: false, priority: 1 })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>필터 만들기</h1>
      <h4>코드(category)</h4>
      <TextField onChange={(e) => setFilterData({ ...filterData, code: e.target.value })} />
      <h4>제목(title)</h4>
      <TextField onChange={(e) => setFilterData({ ...filterData, title: e.target.value })} />
      <div style={{ height: '10px' }}></div>
      <Button onClick={async() => {
        await mutate(filterData)
        navigate(-1)
      }}>만들기</Button>
    </div>
  )
}
export default TeahouseFilterCreatePage
