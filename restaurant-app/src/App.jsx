import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginComponent from './components/LoginComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import OwnerComponent from './components/OwnerComponent'
import { isUserLoggedIn } from './services/AuthService'
import ManagerComponent from './components/ManagerComponent'
import WaiterComponent from './components/WaiterComponent'
import HostComponent from './components/HostComponent'
import AdminComponent from './components/AdminComponent'

function App() {

  const AuthenticatedRoute = ({children}) => isUserLoggedIn() ? children : <Navigate to = "/" />;

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
            <Route path='/' element = {<LoginComponent/>}></Route>
            <Route path= '/owner' element= 
            {
              <AuthenticatedRoute><OwnerComponent/></AuthenticatedRoute>
            }
            ></Route>

            <Route path= '/manager' element= 
            {
              <AuthenticatedRoute><ManagerComponent/></AuthenticatedRoute>
            }
            ></Route>

            <Route path= '/waiter' element= 
            {
              <AuthenticatedRoute><WaiterComponent/></AuthenticatedRoute>
            }
            ></Route>

            <Route path= '/host' element= 
            {
              <AuthenticatedRoute><HostComponent/></AuthenticatedRoute>
            }
            ></Route>

<           Route path= '/admin' element= 
            {
              <AuthenticatedRoute><AdminComponent/></AuthenticatedRoute>
            }
            ></Route>
        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
