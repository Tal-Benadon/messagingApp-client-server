import axios from 'axios'
import { toast } from 'react-toastify'
import { usePopup } from '../context/ModalContext'
async function apiCall({ method, url, body }) {

    console.log('apiCall \n', { method, url, body });
    try {
        const data = await axios({
            method,
            baseURL: import.meta.env.VITE_API_URL,
            url,
            data: body,
            headers: {
                Authorization: `Bearer ${localStorage.mailBoxToken}` || ''
            }
        })
        console.log(data);
        // if (data === 'Expired Token') {
        //     console.log("hi");

        // } else {
        return data
        // }
    } catch (error) {
        console.error(error);
        if (error.response) {

            return { status: error.response.status, data: error.response.data }
        }
        if (error.request) {
            return { status: 500, data: { error: "No response received from server" } }
        } else {
            return { status: 500, data: { error: 'Error in setting up request' } };
        }
    }
}


export default apiCall