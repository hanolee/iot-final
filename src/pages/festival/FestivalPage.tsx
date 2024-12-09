import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import useFestivals from '@/hooks/festival/useFestivals'

const FestivalPage = () => {
  const navigate = useNavigate()
  const { data: festivals, isLoading } = useFestivals()

  // 축제 상태 계산 함수
  const getFestivalStatus = (openedAt: string | null, expiredAt: string | null) => {
    const now = dayjs()
    const openDate = openedAt ? dayjs(openedAt) : null
    const expireDate = expiredAt ? dayjs(expiredAt) : null

    if (openDate && expireDate) {
      if (now.isBefore(openDate)) {
        return '예정'
      } else if (now.isAfter(expireDate)) {
        return '종료'
      } else {
        return '진행 중'
      }
    }
    return '날짜 정보 없음'
  }

  // 축제 기간을 문자열로 변환하는 함수
  const formatFestivalPeriod = (openedAt: string | null, expiredAt: string | null) => {
    const openDate = openedAt ? dayjs(openedAt).format('YYYY.MM.DD') : '미정'
    const expireDate = expiredAt ? dayjs(expiredAt).format('YYYY.MM.DD') : '미정'
    return `${openDate} ~ ${expireDate}`
  }

  if (isLoading) {
    return <CircularProgress style={{ marginTop: '20px' }} />
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>축제 관리</h1>
        <Button
          variant="contained"
          style={{ backgroundColor: '#01c897', color: 'white' }}
          onClick={() => navigate('create')}
        >
          축제 생성
        </Button>
      </div>

      <Typography
        variant="h5"
        style={{ marginBottom: '10px' }}>
        현재 축제 목록
      </Typography>

      {festivals && festivals.length > 0 ? (
        festivals.map((festival) => {
          const status = getFestivalStatus(festival.openedAt, festival.expiredAt)
          const period = formatFestivalPeriod(festival.openedAt, festival.expiredAt)

          return (
            <div
              key={festival.id}
              onClick={() => navigate(`${festival.id}`)}>
              <Card
                style={{ marginBottom: '15px', padding: '10px' }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom>
                    {festival.title} ({festival.year})
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary">
                    {festival.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ marginTop: '10px' }}>
                  위치: {festival.locationLocal}
                  </Typography>
                  <Typography variant="body1">
                  참여비: {festival.participationFee}원
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginTop: '5px' }}>
                    {festival.reservationAvaliable ? '예약 가능' : '예약 불가능'}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginTop: '10px', color: '#888' }}>
                  기간: {period}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginTop: '5px', color: status === '진행 중' ? 'green' : status === '예정' ? 'blue' : 'red' }}>
                  상태: {status}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )
        })
      ) : (
        <Typography
          variant="body1"
          color="textSecondary">
          등록된 축제가 없습니다.
        </Typography>
      )}
    </div>
  )
}

export default FestivalPage
