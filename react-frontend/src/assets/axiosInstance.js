import axios from "axios"

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'content-type': 'application/json',
    }
})

// request interceptor
axiosInstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        console.log(config)
        return config
},  function(error){
    console.log(error)
    return Promise.reject(error)
})




export default axiosInstance;