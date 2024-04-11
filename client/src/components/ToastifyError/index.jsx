import React from 'react'
import styles from './styles.module.css'

export default function ToastifyError() {
    const notify = () => toast("wow so easy")
    return (
        <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer />
        </div>
    )
}
