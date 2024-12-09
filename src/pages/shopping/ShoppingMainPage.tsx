import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import useShops from '@/hooks/shopping/useShops'

const ShoppingMainPage = () => {
  const navigate = useNavigate()
  const { data: shops } = useShops()

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h4">Shopping</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('shop/create')}
      >
        상점 만들기
      </Button>

      <Typography variant="h5">Shops</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {shops?.map((shop) => (
          <Card
            onClick={() => navigate(`shop/${shop.id}`)}
            key={shop.id}
            sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6">{shop.name}</Typography>
              <Typography color="textSecondary">
                Owner: {shop.owner.nickname} ({shop.owner.handle})
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default ShoppingMainPage
