import React from 'react'
import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'

const HomePage = () => {
  const user = false// Replace with your actual authentication logic
  return (
    <div>
      {!user ? <HomeScreen/>:<AuthScreen/>}
    </div>
  )
}

export default HomePage
