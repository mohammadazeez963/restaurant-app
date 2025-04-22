import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'



const HeaderComponent = () => {

  const navigate = useNavigate()

  const urls = ['http://localhost:5173/manager', 'http://localhost:5173/owner']

  function handleLogout(){
      logout();
      navigate("/")
  }

  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
              <div className='container'>
                <div>
                  <a href='http://localhost:3000' className='navbar-brand'>Feel the Taste</a>
                </div>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav'>
                          <li className='nav-item'>
                            Todos
                          </li>
                    </ul>
                </div>
                <ul className='navbar-nav'>

                      {
                        urls.indexOf(window.location.href) >= 0 &&
                        <li className='nav-item'>
                          <NavLink to="/workers" className="nav-link" style={{color:"#ffffff"}} >Manage Workers</NavLink>
                        </li>
                      }
                      
                      {
                        (window.location.href != 'http://localhost:5173/') &&
                        <li className='nav-item' style={{marginLeft:'60px'}}>
                          <NavLink to="/" className="nav-link" style={{color:"#ffffff"}} onClick={handleLogout}>Logout</NavLink>
                        </li>
                      }
                       
                </ul>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent