import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import usePostCreateBrand from '@/hooks/shopping/usePostCreateBrand'

const BrandCreatePage = () => {
  const navigate = useNavigate()
  const { mutateAsync: createBrand } = usePostCreateBrand()

  const [brandData, setBrandData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
    isActive: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setBrandData({
      ...brandData,
      [name]: name === 'isActive' ? checked : value
    })
  }

  const handleSubmit = async () => {
    try {
      await createBrand(brandData)
      alert('브랜드가 성공적으로 생성되었습니다.')
      navigate(-1)
    } catch (error) {
      alert('브랜드 생성 중 오류가 발생했습니다.')
    }
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Typography variant="h4">브랜드 생성</Typography>

      <TextField
        label="브랜드명"
        name="name"
        value={brandData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="설명"
        name="description"
        value={brandData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />

      <TextField
        label="로고 URL"
        name="logo"
        value={brandData.logo}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="웹사이트"
        name="website"
        value={brandData.website}
        onChange={handleChange}
        fullWidth
      />

      <FormControlLabel
        control={
          <Switch
            checked={brandData.isActive}
            onChange={handleChange}
            name="isActive"
          />
        }
        label="활성화 상태"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        브랜드 생성
      </Button>
    </Box>
  )
}

export default BrandCreatePage
