import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        // setLoading(true)
        const userData = {
            username, password
        }

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
            // const response2 = await axios.post('http://127.0.0.1:8000/api/v1/token/refresh', response.data.access)
            console.log(response.data)
        }catch(error){
            console.log('Invalid Credential')
        }
    }

  return (
    <>
        <div className='d-flex justify-content-center align-items-center mb-5'>
                <div className='col-md-5 justify-content-center bg-light-dark p-5 shadow rounded mb-5'>
                    <div className="mb-3">
                        <h2 className='text-center text-light'>Login to our portal</h2>
                    </div>
                    <form className='text-center' onSubmit={handleLogin}>
                        <div className='mb-3'>
                            <input type="text" className='form-control' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className='form-control' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {!loading ? (<button type='submit' className='btn btn-info'>Login</button>) : (<button type='submit' className='btn btn-info' disabled><FontAwesomeIcon icon={faSpinner} spin/> Logging in...</button>)}
                    </form>
                </div>
        </div>
    </>
  )
}

export default Login