import axios from 'axios'
import { toast } from 'react-toastify'
async function apiCall({ method, url, body }) {
    console.log('apiCall \n', { method, url, body });
    try {
        const { data } = await axios({
            method,
            baseURL: import.meta.env.VITE_API_URL,
            url,
            data: body,
            headers: {
                Authorization: localStorage.token || ''
            }
        })
        return data
    } catch (error) {
        console.error(error);
        throw error
    }
}


export default apiCall