import axios from 'axios'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
})
service.interceptors.request.use(
    (config) => {
        return config
    },
)
service.interceptors.response.use(
    (response) => {
        return response.data
    }
)
export default service