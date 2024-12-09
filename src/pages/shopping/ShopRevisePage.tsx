import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useShop from '@/hooks/shopping/useShop'
import useUpdateShop from '@/hooks/shopping/useUpdateShop'

const ShopRevisePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: shop, isLoading } = useShop(Number(id))
  const { mutateAsync: updateShop } = useUpdateShop()

  const [name, setName] = useState<string>('')
  const [deliveryFee, setDeliveryFee] = useState<number>(0)
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState<number>(0)

  useEffect(() => {
    if (shop) {
      setName(shop.name)
      setDeliveryFee(shop.deliveryFee)
      setFreeDeliveryThreshold(shop.freeDeliveryThreshold)
    }
  }, [shop])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!shop) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5">Shop not found</Typography>
      </Box>
    )
  }

  async function revise() {
    try {
      await updateShop({
        shopId: Number(id),
        data: {
          name,
          deliveryFee,
          freeDeliveryThreshold
        }
      })
      alert('수정 완료')
      navigate(-1)
    } catch (e) {
      alert(`에러 발생 ${e}`)
    }
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h4">Shop Edit</Typography>

      <TextField
        label="상점 이름"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={revise}
          fullWidth
        >
          수정하기
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          fullWidth
        >
          취소
        </Button>
      </Box>
    </Box>
  )
}

export default ShopRevisePage
