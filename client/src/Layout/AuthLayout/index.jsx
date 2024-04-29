import React from 'react'
import styles from './styles.module.css'
import { Outlet } from 'react-router-dom'
import mailboxImg from '../../assets/mailboxImg.png'
import world from '../../assets/world.png'
import world2 from '../../assets/world2.webp'
export default function AuthLayout() {
    return (
        <div className={styles.authLayout}>
            <div className={styles.formContainer}>
                <Outlet />
            </div>


            <img src={world2} alt="Paper Plane delivering a message" className={styles.AuthImg} />

        </div>
    )
}
