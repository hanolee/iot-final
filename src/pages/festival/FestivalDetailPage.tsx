import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Card, CardActionArea, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ParticipatorModel } from '@/apis/festival/getFestival'
import useDeleteFacility from '@/hooks/festival/useDeleteFacility'
import useDeleteFestivalImage from '@/hooks/festival/useDeleteImage'
import useDeleteParticipator from '@/hooks/festival/useDeleteParticipator'
import useFestivalById from '@/hooks/festival/useFestivalById'

const FestivalDetailPage = () => {
  const { id } = useParams()
  const { data: festival, isLoading } = useFestivalById(Number(id))
  const navigate = useNavigate()
  const { mutate: deleteParticipator } = useDeleteParticipator()
  const { mutate: deleteFestivalImage } = useDeleteFestivalImage()
  const { mutate: deleteFacility } = useDeleteFacility()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 상태 관리: Dialog(삭제 확인창) 열림 여부와 삭제할 부스 정보
  const [open, setOpen] = useState(false)
  const [selectedParticipator, setSelectedParticipator] = useState<ParticipatorModel | null>()

  // Dialog 열기
  const handleOpen = (participator: ParticipatorModel) => {
    setSelectedParticipator(participator)
    setOpen(true)
  }

  // Dialog 닫기
  const handleClose = () => {
    setOpen(false)
    setSelectedParticipator(null)
  }

  // 삭제 확인 처리
  const handleDelete = () => {
    if (selectedParticipator) {
      deleteParticipator({ festivalId: Number(id), participatorId: selectedParticipator.id })
    }
    handleClose()
  }
  // const handleImageClick = (image: string) => {
  //   setSelectedImage(image)
  // }

  const handleCloseImageDialog = () => {
    setSelectedImage(null)
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (!festival) {
    return <Typography variant="h6">축제 정보를 불러오지 못했습니다.</Typography>
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box>
        <Typography
          variant="h3"
          gutterBottom>
          {festival.title} ({festival.year})
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#01c897', color: 'white' }}
          onClick={() => navigate('revise')}
        >
          수정하기
        </Button>
      </Box>
      <Grid
        container
        spacing={2}>
        <Grid
          item
          xs={12}
          md={6}>
          <Paper
            elevation={3}
            sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
              <Typography
                variant="h6"
                gutterBottom>기본 정보</Typography>
            </Box>
            <Typography><strong>태그:</strong> {festival.tag}</Typography>
            <Typography><strong>설명:</strong> {festival.description}</Typography>
            <Typography><strong>요약:</strong> {festival.summary}</Typography>
            <Typography><strong>참여비:</strong> {festival.participationFee}원</Typography>
            <Typography><strong>예약 가능 여부:</strong> {festival.reservationAvaliable ? '가능' : '불가능'}</Typography>
            <Typography><strong>예약 타입:</strong> {festival.reservationType}</Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <Paper
            elevation={3}
            sx={{ padding: 2 }}>
            <Typography
              variant="h6"
              gutterBottom>위치 정보</Typography>
            <Typography><strong>위치:</strong> {festival.location} ({festival.locationLocal}, {festival.specificLocation})</Typography>
            <Typography><strong>국가:</strong> {festival.nation}</Typography>
            <Typography><strong>도시:</strong> {festival.city} ({festival.cityLocal})</Typography>
            <Typography><strong>구:</strong> {festival.subCity} ({festival.subCityLocal})</Typography>
            <Typography><strong>좌표:</strong> {festival.latitude}, {festival.longitude}</Typography>
            <Typography><strong>공개 여부:</strong> {festival.visible ? '공개' : '비공개'}</Typography>
            <Typography><strong>축제 기간:</strong> {new Date(festival.openedAt).toLocaleDateString()} ~ {new Date(festival.expiredAt).toLocaleDateString()}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <h1>제반시설</h1>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#01c897', color: 'white' }}
        onClick={() => navigate('facility/create')}
      >
          수정하기
      </Button>
      {festival.facilities && festival.facilities.length > 0 ? (
        <List sx={{ marginTop: 2 }}>
          {festival.facilities.map((facility) => (
            <Paper
              key={facility.id}
              elevation={2}
              sx={{ marginBottom: 2 }}>
              <ListItem>
                <ListItemText
                  primary={`${facility.name} (${facility.type})`}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ fontStyle: 'italic' }}>
                      {facility.description}
                    </Typography>
                  }
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteFacility({ facilityId: facility.id, festivalId: festival.id })} // 핸들러 추가
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </Paper>
          ))}
        </List>
      ) : (
        <Typography sx={{ marginTop: 2 }}>기반시설이 없습니다.</Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
        <Typography variant="h5">축제 이미지</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#01c897', color: 'white' }}
          onClick={() => alert('이미지 추가')}
        >
          이미지 추가
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: 2 }}>
        {festival.images.map((image, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.image}
                  alt={`Festival image ${index + 1}`}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.7)' } // 호버 시 붉은색 배경
                  }}
                  onClick={() => deleteFestivalImage({ festivalId: Number(id), imageId: image.id })}
                >
                  <DeleteIcon sx={{ color: '#f44336' }} /> {/* 붉은색 삭제 아이콘 */}
                </IconButton>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedImage && (
        <Dialog
          open={Boolean(selectedImage)}
          onClose={handleCloseImageDialog}
          maxWidth="md"
        >
          <DialogTitle>이미지 보기</DialogTitle>
          <DialogContent>
            <img
              src={selectedImage}
              alt="Selected Festival Image"
              style={{ width: '100%', height: 'auto' }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseImageDialog}
              color="primary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
        <Typography variant="h5">참여 부스 명단</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#01c897', color: 'white' }}
          onClick={() => navigate('participator/create')}
        >
          부스 생성
        </Button>
      </Box>

      {festival.participators && festival.participators.length > 0 ? (
        <List sx={{ marginTop: 2 }}>
          {festival.participators
            .slice() // 원본 배열을 변경하지 않기 위해 slice로 복사
            .sort((a, b) => b.boothNumber - a.boothNumber) // boothNumber에 따라 내림차순 정렬
            .map((participator) => (
              <Paper
                key={participator.id}
                elevation={2}
                sx={{ marginBottom: 2 }}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleOpen(participator)}>
                      <DeleteIcon sx={{ color: '#f44336' }} /> {/* 붉은색 삭제 아이콘 */}
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${participator.name} (부스 번호: ${participator.boothNumber})`}
                    secondary={<Typography
                      component="span"
                      variant="body2"
                      sx={{ fontStyle: 'italic' }}>{participator.description}</Typography>}
                  />
                </ListItem>
                <Divider />
              </Paper>
            ))}
        </List>
      ) : (
        <Typography sx={{ marginTop: 2 }}>참여 부스가 없습니다.</Typography>
      )}

      {/* 삭제 확인 Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 <strong>{selectedParticipator?.name}</strong> 부스를 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary">아니오</Button>
          <Button
            onClick={handleDelete}
            color="error">예</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FestivalDetailPage
