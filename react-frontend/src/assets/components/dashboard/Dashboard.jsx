import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
    const [data, setData] = useState('')

    useEffect(() => {
        const fetchProtectedData = async () => {
            try{
                const response = await axiosInstance.get('/protected-view/')
                console.log(response)
                setData(response.data.status)
            }catch(error){
                console.log(error)
            }
        }
        fetchProtectedData()
    }, [])

  return (
    <div className='container text-light'>{data}</div>
  )
}

export default Dashboard