import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleRegistration = async (e) => {
        e.preventDefault()
        const userData = {
            username, email, password
        }
        console.log(userData)

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
            console.log('Registration Succesful')
            console.log(response.data)
            setSuccess('Registration Successful')
        }catch(error){
            setError(error.response.data)
            console.log('Registration Error: ', error.response.data)
            setSuccess('')
        }
    }
  return (
    <>
    <div className='d-flex justify-content-center align-items-center mb-5'>
            <div className='col-md-5 justify-content-center bg-light-dark p-5 shadow rounded'>
                <div className="mb-3">
                    <h2 className='text-center text-light'>Create An Account</h2>
                    <big className='text-success'>{success && <div className="alert alert-success">{success}</div> }</big>
                </div>
                <form className='text-center' onSubmit={handleRegistration}>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <small>{errors.username && <div className='text-danger' >{errors.username}</div> }</small>
                    </div>
                    <div className="mb-3">
                        <input type="email" className='form-control' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <small>{errors.email && <div className="text-danger">{errors.email}</div> }</small>
                    </div>
                    <div className="mb-3">
                        <input type="password" className='form-control' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <small>{errors.password && <div className="text-danger">{errors.password}</div> }</small>
                    </div>
                    <button type='submit' className='btn btn-info'>Register</button>
                </form>
            </div>
    </div>
    </>
  )
}

export default Register