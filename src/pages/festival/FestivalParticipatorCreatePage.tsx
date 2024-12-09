import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'

const FestivalParticipatorCreatePage = () => {
  const [companyName, setCompanyName] = useState('')
  const [boothNumber, setBoothNumber] = useState<number>(1)
  const [boothDescription, setBoothDescription] = useState('')
  const [tea, setTea] = useState('')
  const [country, setCountry] = useState<'KR' | 'CN' | 'JP' | 'LK' | 'TW' | 'US'>('KR')
  // 위치
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const handleBoothNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) {
      setBoothNumber(Number(e.target.value))
    }
  }

  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState<string | null>(null)

  // Naver Map
  const mapElement = useRef<HTMLDivElement>(null)
  const markerRef = useRef<naver.maps.Marker | null>(null)

  // Generate random bicycle locations around Seoul National University
  const generateRandomLocations = (count: number) => {
    const baseLatitude = 37.4599
    const baseLongitude = 126.9519
    const locations = []

    for (let i = 0; i < count; i++) {
      const randomLatitude = baseLatitude + (Math.random() - 0.5) * 0.01
      const randomLongitude = baseLongitude + (Math.random() - 0.5) * 0.01
      locations.push({
        latitude: randomLatitude,
        longitude: randomLongitude,
        timestamp: `2024년 12월 9일 12:${String(i).padStart(2, '0')}:00`,
        district: '관악구'
      })
    }

    return locations
  }

  const bicycleLocations = generateRandomLocations(20)

  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    if (!mapElement.current) return

    const { naver } = window

    if (!naver) {
      console.error('네이버 지도 API가 로드되지 않았습니다.')
      return
    }

    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(37.4599, 126.9519), // 서울대학교 중심
      zoom: 15
    }

    const map = new naver.maps.Map(mapElement.current, mapOptions)

    // 표시할 위치 결정
    const locationsToDisplay = showAll ? bicycleLocations : [bicycleLocations[bicycleLocations.length - 1]]

    // 자전거 위치 표시
    locationsToDisplay.forEach((location) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(location.latitude, location.longitude),
        title: `${location.timestamp} - ${location.district}`,
        map: map,
        icon: {
          url: 'https://cdn-icons-png.flaticon.com/512/9128/9128343.png', // Replace with your new bicycle icon URL
          scaledSize: new naver.maps.Size(30, 30), // 사용자 정의 크기
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(10, 20) // 마커의 하단 중앙을 기준으로 앵커
        }
      })

      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:5px; font-size:14px; font-weight:bold;">${location.timestamp}<br>${location.district}</div>`,
        borderColor: '#3f51b5',
        borderWidth: 2
      })

      naver.maps.Event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker)
        setSelectedMarkerInfo(`${location.timestamp} - ${location.district}`)
      })
    })

    // 지도 클릭 이벤트 제거
  }, [showAll])

  return (
    <PageWrapperCentered>
      <MapContainer>
        <ButtonWrapper>
          <Button onClick={() => setShowAll(true)}>모든 위치 보기</Button>
          <Button onClick={() => setShowAll(false)}>가장 최근 위치 보기</Button>
        </ButtonWrapper>
        <div
          ref={mapElement}
          style={{ width: '100%', height: '80vh' }} // 버튼을 위한 높이 조정
        />
        {selectedMarkerInfo && (
          <MarkerInfo>
            <p>{selectedMarkerInfo}</p>
          </MarkerInfo>
        )}
      </MapContainer>
    </PageWrapperCentered>
  )
}

export default FestivalParticipatorCreatePage

// Styled components
const PageWrapperCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
`

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 10;
`

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2c387e;
  }
`

const MarkerInfo = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: #f4f4f9;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  z-index: 10;
`
