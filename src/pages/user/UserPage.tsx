import React from 'react'

import useAdminUsers from '@/hooks/user/useAdminUsers'
import usePostChangeUser from '@/hooks/user/usePostMakeFront'

const UserPage = () => {
  const { data: users } = useAdminUsers()
  const { mutateAsync: makeFront } = usePostChangeUser()
  const { mutateAsync: changeUser } = usePostChangeUser()

  return (
    <div>
      {users?.map((user) => (
        <div
          key={user.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #ddd',
            backgroundColor: user.phoneNumber === '01048811597' ? '#f0f8ff' : 'transparent' // 특정 유저 배경색 변경
          }}>
          {/* 유저 정보 표시 */}
          <div>
            <p>ID: {user.id}</p>
            <p>Nickname: {user.nickname}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Description: {user.description}</p>
            {/* 특정 유저인 경우 강조 표시 */}
            {user.phoneNumber === '01048811597' && <p style={{ color: '#01c897', fontWeight: 'bold' }}>Front User</p>}
          </div>
          {(user.phoneNumber === '01048811597') && <button
            onClick={async () => {
              console.log('Clicked')
              try {
                await changeUser({ userId: user.id })
                alert('성공')
              } catch (e) {
                console.log(e)
                alert('에러')
              }
            }}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor: user.phoneNumber === '01048811597' ? '#01c897' : '#f0f0f0', // 특정 유저 버튼 색상 변경
              color: user.phoneNumber === '01048811597' ? 'white' : 'black'
            }}>
            Change User
          </button>}
          {/* 버튼 추가 */}
          <button
            onClick={async () => {
              console.log('Clicked')
              try {
                await makeFront({ userId: user.id })
                alert('성공')
              } catch (e) {
                console.log(e)
                alert('에러')
              }
            }}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor: user.phoneNumber === '01048811597' ? '#01c897' : '#f0f0f0', // 특정 유저 버튼 색상 변경
              color: user.phoneNumber === '01048811597' ? 'white' : 'black'
            }}>
            Make Front
          </button>
        </div>
      ))}
    </div>
  )
}

export default UserPage
