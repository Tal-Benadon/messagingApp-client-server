import React, { useState } from 'react'
import styles from './styles.module.css'
import { IoCloseCircleOutline } from "react-icons/io5";

export default function PopUp({ action, onClose, children, subContent, show }) {

    const handleConfirmClick = (action, onClose) => {
        if (action) {

            action()
        }
        onClose()
    }
    //scale
    return (
        <div className={styles.popUp}
            style={{
                transform: show ? 'scale(1)' :
                    'scale(0)',
                opacity: show ? 1 : 0
            }}>

            <div className={styles.titleDiv}>
                <div className={styles.title}>
                    {children}
                </div>
                <div className={styles.subtitle}>
                    {subContent}
                </div>
                <button className={styles.exitButton} onClick={onClose}><IoCloseCircleOutline /></button>
            </div>
            <div className={styles.modalButtons}>
                <button className={styles.confirm} onClick={() => handleConfirmClick(action, onClose)}>Confirm</button>
                <button onClick={onClose} className={styles.deny}>Close</button>
            </div>
        </div>
    )
}
