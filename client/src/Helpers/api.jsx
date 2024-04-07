import axios from 'axios'
async function apiCall({ method, url, body }) {
    try {
        const { data } = await axios({
            method,
            baseURL: import.meta.env.VITE_API_URL,
            url,
            data: body,
        })
        return data
    } catch (error) {
        console.error(error);
    }
}

export default apiCall