import React from 'react'
import styles from './styles.module.css'
export default function InputWrapper({ title, titleStyle = false, name = '', onChange, autoComplete = 'off', style = {}, type = 'text', ...props }) {
    return (
        <label className={styles.inputLabel} style={{ ...style }}>
            <div className={titleStyle ? styles.title : ''}>
                {title}
            </div>
            <input type={type} autoComplete={autoComplete} name={name} className={styles.input} onChange={onChange}  {...props} />
        </label>
    )
}
