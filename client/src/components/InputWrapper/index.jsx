import React from 'react'
import styles from './styles.module.css'
export default function InputWrapper({ title,
    titleStyle = false,
    name = '', onChange,
    autoComplete = 'off',
    style = {},
    type = 'text',
    ...props }) {
    return (

        <input
            type={type}
            autoComplete={autoComplete}
            placeholder={title}
            aria-label={title}
            name={name}
            className={styles.input}
            onChange={onChange}
            {...props} />



    )
}
