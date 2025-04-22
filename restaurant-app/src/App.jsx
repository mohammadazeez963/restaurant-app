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
import ViewOrder from './components/ViewOrder'
import ChefComponent from './components/ChefComponent'
import ItemComponent from './components/ItemComponent'
import WorkersComponent from './components/WorkersComponent'

function App() {

  const AuthenticatedRoute = ({children}) => isUserLoggedIn() ? children : <Navigate to = "/" />;
  const LandingPage = ({children}) => {
    localStorage.clear();
    sessionStorage.clear();
    
    return children
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
            <Route path='/' element = {
              <LandingPage><LoginComponent/></LandingPage> 
            }></Route>
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

            <Route path= '/chef' element= 
            {
              <AuthenticatedRoute><ChefComponent/></AuthenticatedRoute>
            }
            ></Route>

            <Route path= '/view-order/:id' element= 
            {
              <AuthenticatedRoute><ViewOrder/></AuthenticatedRoute>
            }
            ></Route>

            <Route path= '/item' element= 
            {
              <AuthenticatedRoute><ItemComponent/></AuthenticatedRoute>
            }
            ></Route>

            <Route path= '/item/:id' element= 
            {
              <AuthenticatedRoute><ItemComponent/></AuthenticatedRoute>
            }
            ></Route>

            <Route path= '/workers' element= 
            {
              <AuthenticatedRoute><WorkersComponent/></AuthenticatedRoute>
            }
            ></Route>

        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
