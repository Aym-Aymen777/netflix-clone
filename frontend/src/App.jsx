import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/home/HomePage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/Auth.js'

const App = () => {
  const {user,authCheck} = useAuthStore()
    useEffect(()=>{
        authCheck()
    },[user])
  return (
    <>
    <Routes >
      <Route path="/login" element={!user?<LoginPage/>:<Navigate to={"/"}/>} />
      <Route path="/signup" element={!user?<SignupPage/>:<Navigate to={"/"}/>} />
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    <Toaster/>
    <Footer companyInfo="Specializing in cutting-edge web development and innovative digital solutions. Transforming ideas into exceptional digital experiences." />
    </>
  )
}

export default App

