import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import MessageButton from '../../components/MessageButton'
import { IoPaperPlane } from "react-icons/io5";
import InputWrapper from '../../components/InputWrapper';
import MessageInputBox from '../../components/MessageInputBox';
import useAxiosReq from '../../hooks/useAxiosReq';
import apiCall from '../../Helpers/api';
import { toast } from 'react-toastify'
import { toastifyHandler } from '../../components/ToastifyHandler';
import { TfiWrite } from "react-icons/tfi";
import apiToastCall from '../../Helpers/apiToast';
export default function NewMessagePage() {

    const [emailsList, setEmailsList] = useState([])
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [dataBaseMails, setDataBaseMails] = useState([])
    const { data, loading } = useAxiosReq({ method: "GET", url: 'user/database-emails' })
    const filter = email ? dataBaseMails.filter(mail => mail.email.includes(email) && !emailsList.includes(mail.email)) : []
    useEffect(() => {
        if (data) {
            setDataBaseMails(data)
        }
    }, [data])


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!subject || !message || emailsList.length < 1) {
            toastifyHandler({ handler: 'error', text: "Please make sure all fields are filled." })
            return;
        }



        const membersIdList = []
        emailsList.forEach(email => {
            membersIdList.push(dataBaseMails.find(mail => mail.email === email)._id)
        })
        const newChat = {
            subject,
            members: membersIdList,
            msg: {
                content: message,
                date: new Date(),
                from: '660e9b7ffd6968d3bfa0ce16'
            },
            lastDate: new Date()
        }
        console.log("hi");
        setEmailsList([])
        setSubject('')
        setMessage('')
        const result = await apiToastCall({ method: 'POST', url: 'chat/create-send', body: newChat, pending: 'Creating Chat', success: 'Chat Created!', error: "An error occured while creating" })
        console.log(result);
        // toastifyHandler('success', "Your chat has been created.")

    }

    const handleMailChange = (e) => {

        setEmail(e.target.value)
    }
    const handleAddEmail = (event) => {
        event.preventDefault()
        if (email && !emailsList.includes(email) && data.find(u => u.email === email)) {

            setEmailsList((currentEmails) => [...currentEmails, email])



            setEmail('')
        }
    }


    const handleFilterClick = (email) => {
        setEmail(email)
    }
    const handleDeleteEmail = (emailToDelete) => {
        setEmailsList((currentEmails) => currentEmails.filter(email => email !== emailToDelete))

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
                            onChange={(e) => setSubject(e.target.value)}
                            value={subject} />
                        { }
                        <div className={styles.addSection} >
                            <InputWrapper title={'To'}
                                name={'to'}
                                type={'email'}
                                style={{ display: 'flex' }}
                                titleStyle={true}
                                value={email}
                                onChange={(e) => handleMailChange(e)}
                            />
                            <button className={styles.addToEmailList} onClick={handleAddEmail}>Add</button>
                            {filter.length === 1 && filter[0].email === email ? '' :
                                filter.length > 0 ?
                                    <ul className={styles.filteringUl}>
                                        {filter.map(email => {
                                            return (
                                                <li key={email.email} className={styles.emailLi}
                                                    onClick={() => handleFilterClick(email.email)}>
                                                    {email.email}</li>
                                            )
                                        }
                                        )}
                                    </ul> : ''}
                        </div>
                        <div className={styles.accordion} style={{ gridTemplateRows: "1fr" }}>
                            <div className={styles.emailTagsGroup} style={{ overflowY: "hidden" }}>
                                {emailsList.map(email => {
                                    return (
                                        <div className={styles.emailTag}
                                            key={email}>
                                            {email}
                                            <button className={styles.tagButton} onClick={() => handleDeleteEmail(email)}>x</button></div>
                                    )
                                })}
                            </div>
                        </div>
                        <MessageInputBox value={message} onChange={(e) => setMessage(e.target.value)} />
                        <div style={{ alignSelf: 'end' }}>
                            <MessageButton wrap={true} title={'Send'} icon={<IoPaperPlane />} type={'submit'} />
                            <MessageButton wrap={true} title={'Draft'} icon={<TfiWrite />} type={'button'} />
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
