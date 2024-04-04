import React from 'react'
import styles from './styles.module.css'
import { NavLink } from 'react-router-dom'
export default function SideBarsButton({ icon, to }) {
    return (
        <NavLink to={to} className={({ isActive }) =>
            isActive ? `${styles.active} ${styles.tabIconBody}` : styles.tabIconBody}>
            <div className={styles.tabIcon}>

                {icon}
            </div>
        </NavLink>
    )
}
