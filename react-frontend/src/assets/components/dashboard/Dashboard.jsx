import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import axios from 'axios'

const Dashboard = () => {
    const [data, setData] = useState('')
    const [ticker, setTicker] = useState('')

    useEffect(() => {
        const fetchProtectedData = async () => {
            try{
                const response = await axiosInstance.get('/protected-view/')
                setData(response.data.status)
            }catch(error){
                console.log(error)
            }
        }
        fetchProtectedData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axiosInstance.post('/predict/', {'ticker': ticker})
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className="container mb-5">
        <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit}>
                <input className='form-control mb-3' type="text" placeholder='Select Stock Ticker' onChange={(e) => setTicker(e.target.value)} required/>
                <button type="submit" className='btn btn-info'>See Prediction</button>
            </form>
        </div>
    </div>
  )
}

export default Dashboard