import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import usePostCreateFestival from '@/hooks/festival/usePostCreateFestival'

const FestivalCreatePage = () => {
  const { mutate: create } = usePostCreateFestival()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    location: '',
    locationLocal: '',
    specificLocation: '',
    nation: '',
    city: '',
    cityLocal: '',
    subCity: '',
    subCityLocal: '',
    longitude: '',
    latitude: '',
    year: new Date().getFullYear(),
    title: '',
    description: '',
    tag: '',
    summary: '',
    participationFee: 0,
    visible: false,
    reservationAvaliable: false,
    reservationType: 'SINGLE',
    openedAt: '',
    expiredAt: ''
  })

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    })
  }

  // 폼 제출 핸들러
  const handleSubmit = () => {
    const festivalData = {
      ...formData,
      openedAt: new Date(formData.openedAt), // 문자열을 Date 객체로 변환
      expiredAt: new Date(formData.expiredAt)
    }
    create(festivalData, { onSuccess: () => navigate('/festival', { replace: true }) })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>축제 생성 페이지</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <TextField
          label="축제명"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="영문 주소"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="한글 주소"
          name="locationLocal"
          value={formData.locationLocal}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="상세 주소"
          name="specificLocation"
          value={formData.specificLocation}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="국가"
          name="nation"
          value={formData.nation}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="도시 (영문)"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="도시 (한글)"
          name="cityLocal"
          value={formData.cityLocal}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="구 (영문)"
          name="subCity"
          value={formData.subCity}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="구 (한글)"
          name="subCityLocal"
          value={formData.subCityLocal}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="경도"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="위도"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="연도"
          name="year"
          value={formData.year}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="설명"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3} />
        <TextField
          label="태그"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="요약"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="참여비"
          type="number"
          name="participationFee"
          value={formData.participationFee}
          onChange={handleChange}
          fullWidth />
        <TextField
          label="시작일"
          type="date"
          name="openedAt"
          value={formData.openedAt}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }} />
        <TextField
          label="종료일"
          type="date"
          name="expiredAt"
          value={formData.expiredAt}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }} />

        <FormControlLabel
          control={<Checkbox
            checked={formData.visible}
            name="visible"
            onChange={handleCheckboxChange} />}
          label="공개 여부"
        />
        <FormControlLabel
          control={<Checkbox
            checked={formData.reservationAvaliable}
            name="reservationAvaliable"
            onChange={handleCheckboxChange} />}
          label="예약 가능 여부"
        />
        <TextField
          label="예약 타입"
          name="reservationType"
          value={formData.reservationType}
          onChange={handleChange}
          fullWidth />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}>
          축제 생성
        </Button>
      </div>
    </div>
  )
}

export default FestivalCreatePage
