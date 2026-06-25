import axios from "axios"

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API
})

httpClient.interceptors.request.use((config) => {
    console.log(config)
    return config
})
