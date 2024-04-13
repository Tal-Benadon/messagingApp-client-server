import React, { useRef, useState } from 'react'
import styles from './styles.module.css'
export default function ButtonsHeaderFooter({ icon, onClickHandle }) {

    console.log(onClickHandle);

    return (
        <button className={styles.iconDiv} onClick={onClickHandle}>

            {icon}
        </button>
    )
}
