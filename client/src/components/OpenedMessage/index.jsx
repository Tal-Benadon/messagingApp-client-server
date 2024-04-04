import React, { useState } from 'react'
import styles from './styles.module.css'
import defaultImg from '../../assets/defaultImg.jpg'
import { TiArrowBack } from "react-icons/ti";

export default function OpenedMessage({ avatarImg, userName, date, hour, msg }) {

    const [isOpen, setIsOpen] = useState()

    const handleOnclick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.openedMessageContainer} >
            <button className={styles.openedMessageHeader} onClick={() => handleOnclick()}>
                {avatarImg ? <img src={avatarImg} className='avatarImg' alt="avatar image" /> :
                    <div className='avatarImg'>
                        <TiArrowBack />
                        You
                    </div>
                }

                <div className={styles.userName}>{userName}</div>
                <div className={styles.ellipsisContainer}>
                    <div className={styles.previewText} style={{ opacity: isOpen ? "0" : "1" }}>{msg}</div>
                </div>
                <div className={styles.dateHourContainer}>
                    <div className={styles.dateHour}>{date}</div>
                    <div className={styles.dateHour}>{hour}</div>
                </div>
            </button>
            <div className={styles.accordion} style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div style={{ overflowY: 'hidden' }}>
                    <div className={styles.msgContent}>
                        {msg}
                    </div>
                </div>
            </div>
        </div>
    )
}
