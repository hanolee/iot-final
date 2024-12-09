import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  timeout: 100 * 1000 // 단위 ms
})
export const accessToken = localStorage.getItem('drat')
export const refreshToken = localStorage.getItem('drrt')

const onRequestConfigClient = async (config: AxiosRequestConfig) => {
  //config.headers['User-Agent'] = process.env.USER_AGENT || ''
  return config
}
const onRequestError = (error: AxiosError) => Promise.reject(error)
client.interceptors.request.use(onRequestConfigClient, onRequestError)

// const onResponseSuccess = (config: AxiosResponse) => config.data
const onResponseSuccess = (config: AxiosResponse) => config.data
const onResponseerror = (error: AxiosError) => Promise.reject(error)
client.interceptors.response.use(onResponseSuccess, onResponseerror)

export const request = <T>(options: AxiosRequestConfig): Promise<T> => client.request(options)

export function isError(payload: any): payload is AxiosError<{ message: string; code: string }>{
  return axios.isAxiosError(payload)
}
