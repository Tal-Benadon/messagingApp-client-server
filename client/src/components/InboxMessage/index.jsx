import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import defaultImg from '../../assets/defaultImg.jpg'
import MessageEllipsis from '../MessageEllipsis'
import { BsFillStarFill } from "react-icons/bs";
import { NavLink, useLocation } from 'react-router-dom';
export default function InboxMessage({ avatarImg, userName, msgPreview, sentTime, to }) {
    const [readMsg, setReadMsg] = useState(false)

    const location = useLocation()
    const [isFavorite, setIsFavorite] = useState(false)


    useEffect(() => {
        if (location.pathname === to && !readMsg) {
            setReadMsg(true)
        }
    }, [location, to, readMsg, setReadMsg])

    const clickFavorite = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFavorite(!isFavorite)
        return
    }
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.inboxMessageContainer}` : styles.inboxMessageContainer}

        >
            <img src={avatarImg} className={styles.avatarImg} alt="person image" />
            <div className={styles.textContainer}>
                <div className={styles.userName}>
                    {userName}
                </div>
                <div className={styles.previewText}>
                    {msgPreview}
                </div>
            </div>
            <div className={styles.msgTimestampsFavorites}>
                <div className={styles.msgTime}>{sentTime}</div>
                {!readMsg ? <div className={styles.unreadMsgsIcon}>1</div>
                    : <button onClick={clickFavorite} type='button'>
                        <BsFillStarFill className={isFavorite ? styles.activeStarIcon : styles.starIcon} />
                    </button>}

            </div>
        </NavLink>
    )
}
