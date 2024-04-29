import React from 'react'
import styles from './styles.module.css'

export default function MessageButton({ newChat, wrap = false, title, icon = '', handleClick, type = '' }) {
    return (
        wrap ? <button type={type} onClick={handleClick} className={styles.buttonContainer} style={{ width: 'fit-content' }}>
            <div>{title}</div>
            {icon ?
                <div className={styles.icon}>{icon}</div> : ''
            }
        </button> :
            <button type={type} onClick={handleClick} className={styles.buttonContainer} >
                <div className={styles.icon}>{icon}</div>
                <div>{title}</div>
            </button>

    )
}
