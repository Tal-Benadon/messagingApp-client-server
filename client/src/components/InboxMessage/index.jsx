import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import defaultImg from '../../assets/defaultImg.jpg'
import MessageEllipsis from '../MessageEllipsis'
import { BsFillStarFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import apiCall from '../../Helpers/api';
import { useRead } from '../../context/ReadContext';
export default function InboxMessage({ initial, avatarImg, userName, subject, sentTime, to, isRead, isFavorite, chatId, isDrafts }) {

    const [read, setRead] = useState(isRead)
    const { setUnreadChats } = useRead()
    const [favorite, setFavorite] = useState(isFavorite)

    const readCallTrigger = async (chatId) => {
        if (read === false) {
            const response = await apiCall({ method: "PUT", url: `chat/${chatId}/read` })
            console.log(response);
            if (response.success) {
                setRead(true)
                setUnreadChats(prev => prev - 1)
            }
        }
    }

    const clickFavorite = async (e, chatId) => {
        e.preventDefault()
        e.stopPropagation()
        if (favorite === false) {
            setFavorite(true)
            const response = await apiCall({ method: "PUT", url: `chat/${chatId}/favorite` })
            if (response.success === false) setFavorite(false)
        }
        if (favorite === true) {
            setFavorite(false)
            const response = await apiCall({ method: "PUT", url: `chat/${chatId}/remove-favorite` })
            if (response.success === false) setFavorite(false)
        }
        return
    }
    return (
        <NavLink onClick={() => readCallTrigger(chatId)} to={to} state={{ subject }}
            className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.inboxMessageContainer}` : styles.inboxMessageContainer}

        >
            {avatarImg ? <img src={avatarImg} className={styles.avatarImg} alt="person image" /> :
                <div className={styles.initial}>{initial}</div>
            }

            <div className={styles.textContainer}>
                <div className={styles.userName}>
                    {userName}
                </div>
                <div className={styles.previewText}>
                    {subject}
                </div>
            </div>
            {isDrafts === 'draft'
                ? ''
                : <div className={styles.msgTimestampsFavorites}>
                    <div className={styles.msgTime}>{sentTime}</div>
                    {!read
                        ? <HiMail className={styles.unreadChatIcon} />
                        : <button onClick={(e) => clickFavorite(e, chatId)} type='button'>
                            <BsFillStarFill className={favorite ? styles.activeStarIcon : styles.starIcon} />
                        </button>}
                </div>
            }
        </NavLink>
    )
}
