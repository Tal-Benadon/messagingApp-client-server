import React, { useRef, useState } from 'react'
import styles from './styles.module.css'
import { useUser } from '../../context/UserContext'
import apiCall from '../../Helpers/api'
import apiToastCall from '../../Helpers/apiToast'
import MessageButton from '../../components/MessageButton'
import { IoMdCheckmark } from "react-icons/io";
export default function SettingsPage() {
    const [file, setFile] = useState()
    const [preview, setPreview] = useState()
    const { user } = useUser()

    const editImgRef = useRef(null)

    const onEditClick = () => {
        editImgRef.current.click()
    }

    const handleChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(selectedFile)

    }
    console.log(file);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        try {
            const res = await apiToastCall({
                method: 'PUT',
                url: 'user/editAvatar',
                body: formData,
                pending: 'Updating image...',
                success: 'Image Updated!',
            })
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.mainSubContainer}>
                <h1 className={styles.title}>Settings</h1>

                <p className={styles.imgText}>For this demo, you can change your profile picture</p>
                <input type="file" name='file' accept='image/*' ref={editImgRef} onChange={handleChange} style={{ display: 'none' }} />
                <div className={styles.avatarAlign}>
                    <button className={styles.avatarContainer} onClick={onEditClick}>
                        <img className={styles.avatar} src={preview ? preview : user.avatar} alt="user img" />
                        <div className={styles.avatarOverlay}>Edit</div>
                    </button>
                    <div className={`${styles.btnAnimation} ${preview ? styles.active : ''}`}>
                        <MessageButton wrap title={`Confirm `} icon={<IoMdCheckmark />} type='submit' handleClick={handleSubmit} />
                    </div>
                </div>

            </div>
        </main>
    )
}
