export default function timeSince(createdAt: string): string {
  const now = new Date()
  const createdDate = new Date(createdAt)
  const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000)

  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  //const month = day * 30 // 간략하게 한 달을 30일로 간주합니다.

  if (seconds < minute) {
    return '방금 전'
  } else if (seconds < hour) {
    return `${Math.floor(seconds / minute)}분 전`
  } else if (seconds < day) {
    return `${Math.floor(seconds / hour)}시간 전`
  } else if (seconds < day * 2) {
    return '1일 전'
  } else if (seconds < day * 3) {
    return '2일 전'
  } else {
    return `${createdDate.getMonth() + 1}/${createdDate.getDate()}`
  }
}

export function formatDate(isoDateString: string): string {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

  const date = new Date(isoDateString)
  const currentDate = new Date()

  // 날짜 요소 가져오기
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const dayOfWeek = days[date.getDay()]
  const hour = date.getHours()
  const minute = date.getMinutes()

  // 시간 설정
  const timeString = hour === 3 ? (minute === 0 ? '오후 12시' : `오후 12시 ${minute}분`) : ''

  // 현재 날짜와의 차이 계산
  const weekDifference = getWeekDifference(currentDate, date)
  const monthDifference = month - currentDate.getMonth()
  const yearDifference = year - currentDate.getFullYear()

  // 날짜 형식 결정
  if (yearDifference === 0 && monthDifference === 0) {
    if (weekDifference === 1) {
      return `다음 주 ${day}일 ${dayOfWeek} ${timeString}`
    } else if (weekDifference === 2) {
      return `다다음 주 ${day}일 ${dayOfWeek} ${timeString}`
    } else {
      return `이번 달 ${day}일 ${dayOfWeek} ${timeString}`
    }
  } else if (yearDifference === 0 && monthDifference === 1) {
    return `다음 달 ${day}일 ${dayOfWeek} ${timeString}`
  } else {
    // 기타 경우 (예: 년도가 다를 때)
    return `${year}년 ${months[month]} ${day}일 ${dayOfWeek} ${timeString}`
  }
}

function getWeekDifference(date1: Date, date2: Date): number {
  const msPerWeek = 1000 * 60 * 60 * 24 * 7
  return Math.round((date2.getTime() - date1.getTime()) / msPerWeek)
}

export type Weekday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export function isTodayFromWeekday(weekday: Weekday): boolean {
  const today = new Date()
  const dayOfWeek = today.getDay() // getDay()는 일요일을 0으로 반환합니다.

  const dayMap: { [key: string]: number } = { 'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRI': 5, 'SAT': 6 }

  return dayMap[weekday] === dayOfWeek
}

export function convertNumberToTimeFormat(time: number): string {
  const hours = Math.floor(time)
  const minutes = Math.floor((time - hours) * 60)

  // 시간과 분을 두 자리 수 형식으로 맞춤
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}
