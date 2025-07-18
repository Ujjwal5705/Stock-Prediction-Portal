import React, { useContext } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import { useNavigate } from 'react-router-dom'


const Header = () => {
  const {isLoggedIn, setLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    setLoggedIn(false)
    console.log('logged out')
    navigate('/')
  }

  return (
    <>
    <div className='navbar container mt-3 align-items-start'>
        <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>

        <div>
          {isLoggedIn ? 
          (
          <>
            <Button text='Dashboard' class='btn-outline-success' url='/dashboard'/>
            &nbsp;
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </>
          ) 
          : 
          (
          <>
            <Button text='Login' class='btn-outline-info' url='/login'/>
            &nbsp;
            <Button text='Register' class='btn-info' url='/register'/>
          </>
          )}
        </div>
    </div>
    </>
  )
}

export default Header