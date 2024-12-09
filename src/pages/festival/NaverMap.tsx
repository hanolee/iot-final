import React, { useEffect, useRef } from 'react'

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapElement.current) return

    const { naver } = window

    if (!naver) {
      console.error('Naver Maps API is not loaded')
      return
    }

    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(37.5665, 126.9780), // 서울의 위도와 경도
      zoom: 10
    }

    const map = new naver.maps.Map(mapElement.current, mapOptions)

    // 마커 추가 예시
    new naver.maps.Marker({
      position: new naver.maps.LatLng(37.5665, 126.9780),
      map: map
    })
  }, [])

  return (
    <div
      ref={mapElement}
      style={{ width: '100%', height: '400px' }} />
  )
}

export default NaverMap
