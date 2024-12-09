import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import useBrands from '@/hooks/shopping/useBrands'

function BrandMainPage() {
  const navigate = useNavigate()
  const { data: brands, isLoading, error } = useBrands()

  if (isLoading) return <Typography>로딩 중...</Typography>
  if (error) return <Typography>에러가 발생했습니다.</Typography>

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">브랜드 목록</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/shopping/brand/create')}
        >
          브랜드 등록
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {brands?.map((brand) => (
          <Box
            key={brand.id}
            sx={{
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
            onClick={() => navigate(`/shopping/brand/${brand.id}`)}
          >
            <Typography variant="h6">{brand.name}</Typography>
            {brand.description && (
              <Typography color="text.secondary">{brand.description}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default BrandMainPage
