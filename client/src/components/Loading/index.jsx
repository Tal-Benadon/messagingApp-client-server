import React from 'react'
import styles from './styles.module.css'
export default function Loading() {
    return (
        /* wrapping custom loader to expand and center within the parent */
        <div className={styles.loaderCenterInContainer}>
            <div className={styles.loader}>
                <div className={styles.loader__balls}>
                    <div className={styles.loader__balls__group}>
                        <div className={`${styles.ball} ${styles.item1}`}></div>
                        <div className={`${styles.ball} ${styles.item1}`}></div>
                        <div className={`${styles.ball} ${styles.item1}`}></div>
                    </div>
                    <div className={styles.loader__balls__group}>
                        <div className={`${styles.ball} ${styles.item2}`}></div>
                        <div className={`${styles.ball} ${styles.item2}`}></div>
                        <div className={`${styles.ball} ${styles.item2}`}></div>
                    </div>
                    <div className={styles.loader__balls__group}>
                        <div className={`${styles.ball} ${styles.item3}`}></div>
                        <div className={`${styles.ball} ${styles.item3}`}></div>
                        <div className={`${styles.ball} ${styles.item3}`}></div>
                    </div>
                </div>
                <p style={{ color: `#8191A9`, textAlign: 'center', paddingTop: '1rem' }}> Loading</p>
            </div>
        </div>
    )
}
