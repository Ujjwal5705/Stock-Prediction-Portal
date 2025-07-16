import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Dashboard = () => {
    const [data, setData] = useState('')
    const [ticker, setTicker] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [plot, setPlot] = useState()
    const [plot100, setPlot100] = useState()
    const [plot200, setPlot200] = useState()


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
        setLoading(true)
        try{
            const response = await axiosInstance.post('/predict/', {'ticker': ticker})
            console.log(response.data)
            setPlot(response.data.plot)
            setPlot100(response.data.plot_100)
            setPlot200(response.data.plot_200)
            if(response.data.error){
                setError(response.data.error)
            }
            else{
                setError()
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className="container mb-5">
        <div className="col-md-6 mx-auto">
            <div className="mb-3">
                {error && <div className="alert alert-danger">{error}</div> }
            </div> 
            <form onSubmit={handleSubmit}>
                <input className='form-control mb-3' type="text" placeholder='Select Stock Ticker' onChange={(e) => setTicker(e.target.value)} required/>
                {!loading ? (<button type='submit' className='btn btn-info'>See Prediction</button>) : (<button type='submit' className='btn btn-info' disabled><FontAwesomeIcon icon={faSpinner} spin/>Please wait...</button>)}
            </form>
        </div>
        <div className='text-center mt-4'>
            {plot && <img style={{maxWidth : '100%'}} src={import.meta.env.VITE_BACKEND_ROOT_URL + plot} alt="Stock Closing Price" /> }
        </div>
        <div className='text-center mt-4'>
            {plot && <img style={{maxWidth : '100%'}} src={import.meta.env.VITE_BACKEND_ROOT_URL + plot100} alt="100 DMA" /> }
        </div>
        <div className='text-center mt-4'>
            {plot && <img style={{maxWidth : '100%'}} src={import.meta.env.VITE_BACKEND_ROOT_URL + plot200} alt="200 DMA" /> }
        </div>
    </div>
  )
}

export default Dashboard