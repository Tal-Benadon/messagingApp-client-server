import axios from 'axios'
import { toast } from 'react-toastify'
import { usePopup } from '../context/ModalContext'
async function apiCall({ method, url, body }) {
    // const { togglePopup } = usePopup()
    // const getNewToken = async () => {
    //     const userId = localStorage.mailBoxId
    //     const { user, token } = apiCall({ method: "POST", url: "user/login", body: userId })
    //     localStorage.mailBoxToken = token
    //     localStorage.mailBoxId = user._id
    //     setUser(user)
    // }

    // const logOut = () => {
    //     removeItem(mailBoxToken)
    //     removeItem(mailBoxId)
    //     nav('/login')
    // }
    console.log('apiCall \n', { method, url, body });
    try {
        const { data } = await axios({
            method,
            baseURL: import.meta.env.VITE_API_URL,
            url,
            data: body,
            headers: {
                Authorization: `Bearer ${localStorage.mailBoxToken}` || ''
            }
        })
        // console.log(data);
        // if (data === 'Expired Token') {
        //     togglePopup("Session Expired", "Do you wish to stay?", () => getNewToken(), () => logOut())


        // } else {
        return data
        // }
    } catch (error) {
        console.error(error);
        throw error
    }
}


export default apiCall