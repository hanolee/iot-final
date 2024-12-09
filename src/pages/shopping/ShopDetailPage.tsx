import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import useShop from '@/hooks/shopping/useShop'

const ShopDetailPage = () => {
  const { id } = useParams()
  const { data: shop, isLoading } = useShop(Number(id))
  const navigate = useNavigate()

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

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h4"
          gutterBottom>
          Shop Details
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('edit')}
          >
            상점 수정
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('product/create')}
          >
            상품 등록
          </Button>
        </Box>
      </Box>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div">
            {shop.name}
          </Typography>
          <Typography
            color="textSecondary"
            sx={{ mb: 1 }}>
            Created at: {new Date(shop.createdAt).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary">
            Owner: {shop.owner.nickname} ({shop.owner.handle})
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary">
            Phone Number: {shop.owner.phoneNumber}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary">
            배송비: {shop.deliveryFee.toLocaleString()}원
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary">
            무료배송 기준: {shop.freeDeliveryThreshold.toLocaleString()}원
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ShopDetailPage
