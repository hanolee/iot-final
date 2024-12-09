interface JWTTokenPayload {
  exp: number;
}

export const storeAccessToken = (accessToken: string) => {
  localStorage.setItem('drat', accessToken)
}
export const storeRefreshToken = (refreshToken: string) => {
  localStorage.setItem('drrt', refreshToken)
}
export const getAccessToken = () => {
  const token = localStorage.getItem('drat') || 'default'
  return token
}
export const getRefreshToken = () => {
  const token = localStorage.getItem('drrt') || 'default'
  return token
}
export const isUserLoggedIn = (): boolean => {
  const token = getAccessToken()
  const length = token.length > 30
  return !!token && length // token이 존재하면 true, 아니면 false 반환
}
const decodeJWT = (accessToken: string): JWTTokenPayload | null => {
  if (!accessToken) {
    return null
  }
  const tokenParts = accessToken.split('.')
  if (tokenParts.length !== 3) {
    throw new Error('Invalid JWT')
  }

  const encodedPayload = tokenParts[1]
  const decodedPayload = atob(encodedPayload)

  const payload: JWTTokenPayload = JSON.parse(decodedPayload)
  return payload
}
export const getPhoneNumberHashed = () => {
  const at = getAccessToken()
  return decodeJWT(at)
}

const extractExpirationTime = (accessToken: string): number | null => {
  try {
    const payload = decodeJWT(accessToken)
    if (payload && payload.exp) {
      return payload.exp
    }
  } catch (error) {
    console.error('Error decoding JWT:', error)
  }

  return null
}

export const validateToken = (token: string) => {
  const expiredtime = extractExpirationTime(token)
  const currenttime = Date.now() / 1000
  if (expiredtime)
    return currenttime < expiredtime
  else
    return false
}
export const validateCurrentAccessToken = () => {
  const at = getAccessToken()
  return validateToken(at)
}
export const validateCurrentRefreshToken = () => {
  const rt = getRefreshToken()
  return validateToken(rt)
}
