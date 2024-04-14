import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
export default function MailboxButton({ icon, text, to, unread }) {
    console.log(unread);
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.btnBody}` : styles.btnBody}
        >

            <div className={styles.navIcon}>
                {icon}
            </div>
            <div className={styles.navText}>
                {text}
            </div>
            {unread > 0 && text === 'Inbox' ?
                <div className={styles.unreadMsgsIcon}>
                    {unread}
                </div>
                : ""}

        </NavLink>
    )
}
