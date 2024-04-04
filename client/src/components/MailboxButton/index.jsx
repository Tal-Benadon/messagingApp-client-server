import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
export default function MailboxButton({ icon, text, to, readMsg }) {
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
            {!readMsg && text === 'Inbox' ?
                <div className={styles.unreadMsgsIcon}>
                    1
                </div>
                : ""}

        </NavLink>
    )
}
