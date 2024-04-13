
import { toast } from 'react-toastify'

export const toastifyHandler = async ({ handler, text }) => {
    const functionalities = {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    switch (handler) {
        case 'error':
            return (
                toast.error(text, functionalities)
            )
        case 'success':
            return (
                toast.success(text, functionalities)
            )
        case 'loading':
            return (
                toast.loading(text, functionalities)
            )
        default:
            toast.error('Something went wrong.', functionalities)
            break;
    }


}
