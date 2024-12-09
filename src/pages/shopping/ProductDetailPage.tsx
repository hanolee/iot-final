import 'swiper/css'

import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import useProduct from '@/hooks/shopping/useProduct'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { data: product, isLoading } = useProduct(Number(id))

  if (isLoading || !product) return <Typography>Loading...</Typography>

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* 제목 */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        {product.name}
      </Typography>

      {/* 이미지 슬라이드 */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        style={{ width: '100%', maxHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}
      >
        {product.images.length > 0 ? (
          product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={image}
                alt={`${product.name}-${index}`}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <Typography>No Image Available</Typography>
          </SwiperSlide>
        )}
      </Swiper>

      {/* 제품 정보 */}
      <Card sx={{ padding: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: 'medium', marginBottom: 1 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2 }}>
            {product.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary">
            {product.summary}
          </Typography>
        </CardContent>
      </Card>

      {/* 상점 정보 */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Store Details
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary">
          Store Name: {product.shop.name}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary">
          Owner: {product.shop.owner.nickname} ({product.shop.owner.handle})
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary">
          Contact: {product.shop.owner.phoneNumber}
        </Typography>
      </Box>

      {/* 장바구니 버튼 */}
      <Button
        variant="contained"
        color="primary"
        sx={{ width: '100%', padding: 2 }}>
        Add to Cart
      </Button>
      <Box sx={{ width: '100%' }}>
        {product.detailImages.map((image) => (<img
          src={image}
          key={image} />))}
      </Box>
    </Box>
  )
}

export default ProductDetailPage
