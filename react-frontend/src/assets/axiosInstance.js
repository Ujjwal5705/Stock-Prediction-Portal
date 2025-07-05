import axios from "axios"

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL
const axiosInstance = axios.create({
    baseURL: baseURL,
})

export default axiosInstance;