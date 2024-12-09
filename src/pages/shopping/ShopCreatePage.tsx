import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import usePostCreateShop from '@/hooks/shopping/usePostCreateShop'

const ShopCreatePage = () => {
  const { mutateAsync: createShop } = usePostCreateShop()
  const [name, setName] = useState<string>('')
  const [userId, setUserId] = useState<number>(1)
  const [deliveryFee, setDeliveryFee] = useState<number>(3000)
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState<number>(30000)
  const navigate = useNavigate()

  async function create() {
    try {
      await createShop({
        userId,
        name,
        deliveryFee,
        freeDeliveryThreshold
      })
      alert('생성 완료')
      navigate(-1)
    } catch (e) {
      alert(`에러 발생 ${e}`)
    }
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h4">Shop Create</Typography>

      <TextField
        label="상점 이름"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <TextField
        label="할당 유저 ID"
        type="number"
        variant="outlined"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        fullWidth
      />

      <TextField
        label="배송비"
        type="number"
        variant="outlined"
        value={deliveryFee}
        onChange={(e) => setDeliveryFee(Number(e.target.value))}
        fullWidth
      />

      <TextField
        label="무료배송 기준금액"
        type="number"
        variant="outlined"
        value={freeDeliveryThreshold}
        onChange={(e) => setFreeDeliveryThreshold(Number(e.target.value))}
        fullWidth
      />

      <Button
        variant="contained"
        color="primary"
        onClick={create}
      >
        Create Shop
      </Button>
    </Box>
  )
}

export default ShopCreatePage
