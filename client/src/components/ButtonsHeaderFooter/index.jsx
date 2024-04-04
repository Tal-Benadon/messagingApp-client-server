import React, { useRef, useState } from 'react'
import styles from './styles.module.css'
export default function ButtonsHeaderFooter({ icon, isFileUploadButton, onFileSelected }) {

    // const fileInputRef = useRef(null)
    // const [selectedFile, setSelectedFile] = useState(null)

    // const handleIconClick = () => {
    //     if (isFileUploadButton) {
    //         fileInputRef.current.click()
    //     }
    // }
    // const handleFileInputChange = (event) => {
    //     if (event.target.files.length > 0) {
    //         const file = event.target.files[0]
    //         setSelectedFile(file)
    //         if (onFileSelected) onFileSelected(file)
    //     }
    // }

    return (
        <div className={styles.iconDiv}>
            {/* {isFileUploadButton && (
                <input type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }} />
            )} */}
            {icon}
        </div>
    )
}
