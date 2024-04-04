import React from 'react'
import styles from './styles.module.css'
export default function InputWrapper({ title, name = '', autoComplete = 'off', style = '', type = 'text', ...props }) {
    return (
        <label className={styles.inputLabel}>
            {title}
            <input type={type} autoComplete={autoComplete} name={name} className={styles.input} {...props} />
        </label>
    )
}
