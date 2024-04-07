import React, { useEffect } from 'react'
import styles from './styles.module.css'
import MessagesChatPage from '../../pages/MessagesChatPage'
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development'
export default function Content() {
    useParams()
    useEffect(() => {
        // axios get chatMSGS by ID in URL
    }, [])
    return (
        <div className={styles.contentContainer}>
            <MessagesChatPage />
        </div>
    )
}
