import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import { ROUTER } from '@/router'

const MainPage = () => {
  const navigate = useNavigate()
  const { TEAHOUSE, TEATOGETHER, NOTIFICATION, POST, FESTIVAL, USER, SHOPPING } = ROUTER
  return (
    <PageWrapper>
      <h1>MainPage</h1>
      <ButtonListWrapper>
        <PageRouterButton onClick={() => navigate(TEAHOUSE)}>Teahouse</PageRouterButton>
        <PageRouterButton onClick={() => navigate(TEATOGETHER)}>Tea Together</PageRouterButton>
        <PageRouterButton onClick={() => navigate(POST)}>Post</PageRouterButton>
        <PageRouterButton onClick={() => navigate(NOTIFICATION)}>NOTIFICATION</PageRouterButton>
        <PageRouterButton onClick={() => navigate(FESTIVAL)}>FESTIVAL</PageRouterButton>
        <PageRouterButton onClick={() => navigate(USER)}>USER</PageRouterButton>
        <PageRouterButton onClick={() => navigate(SHOPPING)}>SHOPPING</PageRouterButton>
        <PageRouterButton onClick={() => navigate(`${SHOPPING}/product`)}>PRODUCT</PageRouterButton>
        <PageRouterButton onClick={() => navigate(`${SHOPPING}/brand`)}>BRAND</PageRouterButton>
      </ButtonListWrapper>
    </PageWrapper>
  )
}
export default MainPage

const PageWrapper = styled.div`
  padding: 60px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const ButtonListWrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 20px;
`
const PageRouterButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #01c897;
  border-radius: 10px;
  color: #fff;
  font-weight: 800;
`
