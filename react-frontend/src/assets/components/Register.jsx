import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegistration = async (e) => {
        e.preventDefault()
        const userData = {
            username, email, password
        }
        console.log(userData)

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
            console.log('Registration Succesfull')
            console.log(response.data)
        }catch(error){
            console.log('Registration failed: ', error.response.data)
        }
    }
  return (
    <>
    <div className='d-flex justify-content-center align-items-center mb-5'>
            <div className='col-md-5 justify-content-center bg-light-dark p-5 shadow rounded'>
                <h2 className='mb-3 text-center text-light'>Create An Account</h2>
                <form className='text-center' onSubmit={handleRegistration}>
                    <input type="text" className='form-control mb-3' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="email" className='form-control mb-3' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className='form-control mb-3' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit' className='btn btn-info'>Register</button>
                </form>
            </div>
    </div>
    </>
  )
}

export default Register