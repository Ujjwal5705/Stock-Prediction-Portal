import React, { useEffect, useState } from 'react'
import axios from 'axios'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
    const [data, setData] = useState('')
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        const fetchProtectedData = async () => {
            try{
                const response = await axiosInstance.get('/protected-view/', {
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