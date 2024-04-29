import axios from "axios";
import { toast } from 'react-toastify'
import { toastifyHandler } from "../components/ToastifyHandler";
async function apiToastCall({ method, url, body, pending, success, error }) {
    if (!error) {
        const error = 'An error occured'
    }
    console.log('apiCall \n', { method, url, body });
    try {
        const config = {
            method,
            baseURL: import.meta.env.VITE_API_URL,
            url,
            data: body,
            headers: {
                Authorization: `Bearer ${localStorage.mailBoxToken}` || ''
            }
        }

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        const axiosTimeout = async (config, timeout = 2500) => {
            //gentrify the pending/success/error
            const response = await Promise.all([
                axios(config),
                delay(timeout)
            ]);
            return response[0];
        };
        return await toast.promise(
            axiosTimeout(config, 1200), {
            pending,
            success,
            error
        },
            {
                position: 'bottom-right'
            }
        )
    } catch (error) {
        toastifyHandler({ handler: 'error', text: 'Request failed 🤯' });
    }
}

export default apiToastCall