import React from 'react'
import styles from './styles.module.css'



export default function MessageEllipsis({ text }) {
    const maxWords = 5
    const words = text.split(' ')
    const shouldTruncate = words.length > maxWords
    const displayedText = shouldTruncate ? words.slice(0, maxWords).join(' ') + '...' : text;

    return <span>{displayedText}</span>
}

