import React from 'react'

const Register = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center mb-5'>
            <div className='col-md-5 justify-content-center bg-light-dark p-5 shadow rounded'>
                <h2 className='mb-3 text-center'>Create An Account</h2>
                <form className='text-center' action="">
                    <input type="text" className='form-control mb-3' placeholder='Enter Username' />
                    <input type="email" className='form-control mb-3' placeholder='Enter Email'/>
                    <input type="password" className='form-control mb-3' placeholder='Enter Password'/>
                    <button type='submit' className='btn btn-info'>Register</button>
                </form>
            </div>
    </div>
    </>
  )
}

export default Register