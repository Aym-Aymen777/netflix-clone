import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/home/HomePage'
import Footer from './components/Footer'

const App = () => {
  const user = false// Replace with your actual authentication logic
  return (
    <>
    <Routes >
      <Route path="/login" element={!user?<LoginPage/>:<Navigate to={"/"}/>} />
      <Route path="/signup" element={!user?<SignupPage/>:<Navigate to={"/"}/>} />
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    <Footer companyInfo="Specializing in cutting-edge web development and innovative digital solutions. Transforming ideas into exceptional digital experiences." />
    </>
  )
}

export default App

