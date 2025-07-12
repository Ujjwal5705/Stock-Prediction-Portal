import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
    const [data, setData] = useState('')

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

  return (
    <div className="container mb-5">
        <div className="col-md-6 mx-auto">
            <form action="">
                <input className='form-control mb-3' type="text" placeholder='Select Stock Ticker'/>
                <button type="button" className='btn btn-info'>See Prediction</button>
            </form>
        </div>
    </div>
  )
}

export default Dashboard