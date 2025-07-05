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
        // console.log(config)
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

// response interceptor
axiosInstance.interceptors.response.use(
    function(response){
        return response
    },
    // handle failed response
    async function(error){
        const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})
                localStorage.setItem('accessToken', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;