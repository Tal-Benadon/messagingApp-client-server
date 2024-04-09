import React, { useState } from 'react'
import styles from './styles.module.css'
import MessageButton from '../../components/MessageButton'
import { IoPaperPlane } from "react-icons/io5";
import InputWrapper from '../../components/InputWrapper';
import MessageInputBox from '../../components/MessageInputBox';
export default function NewMessagePage() {
    const [emailsList, setEmailsList] = useState([])
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    const handleAddSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <div className={styles.newChatContainer}>
            <div className={styles.newChatTitle}>Create a new chat</div>
            <hr className={styles.topHr} />
            <div className={styles.pageBody}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fromHeader}>
                        <InputWrapper title={'Subject'}
                            style={{ display: 'flex' }}
                            name={'subject'}
                            type={'text'}
                            titleStyle={true}
                            value={'subject'} />

                        <div className={styles.addSection} onSubmit={handleAddSubmit}>
                            <InputWrapper title={'To'}
                                name={'to'}
                                type={'email'}
                                style={{ display: 'flex' }}
                                titleStyle={true}
                                value={'email'}
                            />
                            <button className={styles.addToEmailList} type='submit'>Add</button>
                        </div>
                        <MessageInputBox />
                        <div style={{ alignSelf: 'end' }}>
                            <MessageButton wrap={true} title={'Send'} icon={<IoPaperPlane />} type={'submit'} />
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
