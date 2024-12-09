import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProductItemModel } from '@/apis/shopping/getProducts'
import useDeleteProduct from '@/hooks/shopping/useDeleteProduct'
import useProducts from '@/hooks/shopping/useProducts'

const ProductMainPage = () => {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({ limit: 5, page: 1 })
  const { data: products, refetch, isLoading } = useProducts(pagination)
  const [allProducts, setAllProducts] = useState<ProductItemModel[]>([])
  const { mutate: deleteProduct } = useDeleteProduct()

  useEffect(() => {
    if (products) {
      setAllProducts((prevProducts) => [...prevProducts, ...products])
    }
  }, [products])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && !isLoading) {
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  useEffect(() => {
    refetch()
  }, [pagination, refetch])

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('삭제하겠습니까?')
    if (confirmDelete) {
      deleteProduct(id, {
        onSuccess: () => {
          setAllProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
        }
      })
    }
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h4">Products</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {allProducts?.map((product) => (
          <Card
            onClick={() => navigate(`${product.id}`)}
            key={product.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              minWidth: 275,
              cursor: 'pointer',
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' }
            }}
          >
            {product.images[0] && (
              <CardMedia
                component="img"
                image={product.images[0]}
                alt={product.name}
                sx={{ width: { xs: '100%', sm: 160 }, height: 160 }}
              />
            )}
            <CardContent sx={{ flex: '1 1 auto' }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 1 }}>
                {product.summary}
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{ fontWeight: 'medium' }}>
                {product.price.toFixed(2)}￦
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: 1 }}>
                Owner: {product.shop.owner.nickname} | Store: {product.shop.name}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`${product.id}`)
                }}
                sx={{ marginTop: 2 }}
              >
                View Details
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(product.id)
                }}
                sx={{ marginTop: 2, marginLeft: 1 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default ProductMainPage
