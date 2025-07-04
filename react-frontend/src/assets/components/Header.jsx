import React from 'react'
import Button from './Button'

const Header = () => {
  return (
    <>
    <div className='navbar container mt-3 align-items-start'>
        <a className='navbar-brand text-light' href="#">Stock Prediction Portal</a>

        <div>
            <Button text='Login' class='btn-outline-info'/>
            &nbsp;
            <Button text='Register' class='btn-info'/>
        </div>
    </div>
    </>
  )
}

export default Header