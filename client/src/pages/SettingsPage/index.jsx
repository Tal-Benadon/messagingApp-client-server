import React from 'react'
import styles from './styles.module.css'
import { useUser } from '../../context/UserContext'
export default function SettingsPage() {

    const { user } = useUser()

    return (
        <main className={styles.main}>
            <div className={styles.mainSubContainer}>
                <h1 className={styles.title}>Settings</h1>

                <p className={styles.imgText}>For this demo, you can change your profile picture</p>
                <div className={styles.avatarContainer}>
                    <img className={styles.avatar} src={user.avatar} alt="user img" />
                </div>

            </div>
        </main>
    )
}
