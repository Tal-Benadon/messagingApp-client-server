import React, { useRef, useState } from 'react'
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaFileImage } from "react-icons/fa6";
import styles from './styles.module.css'
export default function FileUpload({ type }) {
    const fileInputRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const acceptFile = type === 'image' ? 'image/*' : 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    const icon = type === 'image' ? <FaFileImage /> : <AiOutlinePaperClip />
    const title = type === 'image' ? 'Upload Image' : 'Upload File'
    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            setSelectedFile(file)
            if (onFileSelected) onFileSelected(file)
        }
    }

    const handleClick = () => {
        fileInputRef.current.click()
    }

    return (
        <div >
            <input type="file"
                accept={acceptFile}
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }} />
            <button title={title} onClick={handleClick} className={styles.iconBtn}>
                {icon}
            </button>
        </div>
    )
}
