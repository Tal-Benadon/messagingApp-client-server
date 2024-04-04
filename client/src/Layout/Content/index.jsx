import React from 'react'
import styles from './styles.module.css'
import MessagesChatPage from '../../pages/MessagesChatPage'
export default function Content() {

    return (
        <div className={styles.contentContainer}>
            <MessagesChatPage />
        </div>
    )
}
