import React from 'react'
import styles from './styles.module.css'
export default function ConversationsTitle({ title }) {
    return (
        <div className={styles.titleStyle}>{title}</div>
    )
}
