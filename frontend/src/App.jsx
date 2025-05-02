import React, { useEffect,Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/Auth.js'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'

import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/home/HomePage.jsx'
import AuthScreen from './pages/home/AuthScreen.jsx'
import WatchPage from './pages/WatchPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import NotFound from './components/NotFound.jsx'

const App = () => {
  const {user, authCheck} = useAuthStore()
  
    useEffect(() => {
    authCheck()
  }, [])   

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage/> : <Navigate to={"/"}/> } />
        <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to={"/"}/> } />
        <Route path="/" element={<HomePage/>}/>
        <Route path='/movies' element={<AuthScreen/>}/>
        <Route path='/tvshows' element={<AuthScreen/>}/>
        <Route path='/watch/:id' element={<WatchPage/>}/> 
        <Route path='/search/:content' element={<SearchPage/>}/>
        <Route path='/search/:content/:keyword' element={<SearchPage/>} />
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      <Toaster/>
      <Footer companyInfo="Specializing in cutting-edge web development and innovative digital solutions. Transforming ideas into exceptional digital experiences." />
    </Suspense>
  )
}

export default App