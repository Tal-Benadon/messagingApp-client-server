import React from 'react'
import styles from './styles.module.css'
export default function Backdrop({ show, handleOnClick }) {
    if (!show) return null
    return (
        <div className={styles.backdrop} onClick={handleOnClick}></div>
    )
}
