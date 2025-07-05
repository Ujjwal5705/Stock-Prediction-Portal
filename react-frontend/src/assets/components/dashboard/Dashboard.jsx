import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../header'

const Dashboard = () => {
    const [data, setData] = useState('')
    const accessToken = localStorage.getItem('accessToken')
    
    useEffect(() => {
        const fetchProtectedData = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/v1/protected-view/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(response)
                setData(response.data.status)
            }catch(error){
                console.log(error.response.data.detail)
            }
        }
        fetchProtectedData()
    }, [])

  return (
    <div className='container text-light'>{data}</div>
  )
}

export default Dashboard