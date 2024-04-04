import React from 'react'
import styles from './styles.module.css'
import defaultImg from '../../assets/defaultImg.jpg'
export default function InChatMessage({ avatarImg, userName, msg, date, hour }) {

    const defaultUserName = "Tal Ben Adon"
    const defaultMsgPreview = "Hey, I really need these documents by tomorrow."
    const defaultDate = "24.3.2024"
    const defaultHour = "4:20"
    return (
        <div className={styles.inChatMessageContainer}>
            <img src={avatarImg} className={styles.avatarImg} alt="avatar image" />
            <div className={styles.userName}>{userName}</div>
            <div className={styles.ellipsisContainer}>
                <div className={styles.previewText}>{msg}</div>
            </div>
            <div className={styles.dateHourContainer}>
                <div className={styles.dateHour}>{date}</div>
                <div className={styles.dateHour}>{hour}</div>
            </div>
        </div>
    )
}
