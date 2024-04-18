import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { usePopup } from '../../context/ModalContext';
import { debounce } from '../../Helpers/debouncer';
export default function NewMessagePage() {
    const { togglePopup } = usePopup()
    const [emailsList, setEmailsList] = useState([])
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [draftId, setDraftId] = useState(null) // TO DO, FIRST BOUNCER CREATES THE DRAFT, AFTER THAT EACH BOUNCE UPDATES IT
    const [dataBaseMails, setDataBaseMails] = useState([])
    const [hasInteracted, setHasInteracted] = useState(false)
    const { data, loading } = useAxiosReq({ method: "GET", url: 'user/database-emails' })
    const filter = email ? dataBaseMails.filter(mail => mail.email.includes(email) && !emailsList.includes(mail.email)) : []


    const createDraft = useCallback(async () => {
        console.log('Creating Draft:', { subject, emailsList, message });
        const membersIdList = swapEmailForId()
        const newChat = createChatObj(membersIdList)
        const result = await apiToastCall({ method: 'POST', url: 'chat/create-draft', body: newChat, pending: 'Saving Draft...', success: 'Draft Saved', error: "An error occured while creating" })
        const draftDataId = result.data.draft._id
        console.log(draftDataId);
        setDraftId(draftDataId)
    }, [subject, emailsList, message])

    const updateDraft = useCallback(async () => {
        console.log('Updating Draft', { subject, emailsList, message, draftId });
        const membersIdList = swapEmailForId()
        const newChat = createChatObj(membersIdList)
        const result = await apiToastCall({ method: 'PUT', url: `chat/update-draft`, body: { ...newChat, draftId }, pending: 'Updating Draft...', success: 'Draft Updated', error: "An error occured while creating" })
    }, [subject, emailsList, message, draftId])

    const saveDraft = useCallback(() => {
        if (hasInteracted) {
            if (draftId) {
                updateDraft()
            } else {
                createDraft()
            }
        }
    }, [draftId, createDraft, updateDraft, hasInteracted])

    const debouncedSaveDraft = useMemo(() => debounce(saveDraft, 3000), [saveDraft, hasInteracted]);

    useEffect(() => {

        debouncedSaveDraft()
        return () => {
            debouncedSaveDraft.cancel()
        }

    }, [debouncedSaveDraft])

    useEffect(() => {
        if (data) {
            setDataBaseMails(data)
        }
    }, [data])

    const swapEmailForId = () => {
        const membersIdList = []
        emailsList.forEach(email => {
            membersIdList.push(dataBaseMails.find(mail => mail.email === email)._id)
        })
        return membersIdList
    }

    const createChatObj = (membersIdList) => {
        const newChat = {
            subject,
            members: membersIdList,
            msg: {
                content: message,
                date: new Date(), //TODO - move newDate to server
                from: '660e9b7ffd6968d3bfa0ce16'
            },
            lastDate: new Date() //TODO - move newDate to server
        }
        return newChat
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!subject || !message || emailsList.length < 1) {
            toastifyHandler({ handler: 'error', text: "Please make sure all fields are filled." })
            return;
        }

        const membersIdList = swapEmailForId()//[]
        // emailsList.forEach(email => {
        //     membersIdList.push(dataBaseMails.find(mail => mail.email === email)._id)
        // })
        const newChat = createChatObj(membersIdList)
        setHasInteracted(false)
        setEmailsList([])
        setSubject('')
        setMessage('')
        const result = await apiToastCall({ method: 'POST', url: 'chat/create-send', body: newChat, pending: 'Creating Chat', success: 'Chat Created!', error: "An error occured while creating" })
        console.log(result);
        // toastifyHandler('success', "Your chat has been created.")

    }


    const handleAddEmail = (event) => {
        event.preventDefault()
        if (email && !emailsList.includes(email) && data.find(u => u.email === email)) {

            setEmailsList((currentEmails) => [...currentEmails, email])



            setEmail('')
        }
    }
    const createDraftClick = async () => {
        const membersIdList = swapEmailForId()
        const newChat = createChatObj(membersIdList)
        setEmailsList([])
        setSubject('')
        setMessage('')
        const result = await apiToastCall({ method: 'POST', url: 'chat/create-draft', body: newChat, pending: 'Creating Draft', success: 'Draft Created!', error: "An error occured while creating" })
        return
    }

    const handleDraftClick = () => {
        togglePopup("Create draft?", 'This will wait for your completion under "Draft"', () => createDraftClick())

    }

    const handleFilterClick = (email) => {
        setEmail(email)
    }
    const handleDeleteEmail = (emailToDelete) => {
        setEmailsList((currentEmails) => currentEmails.filter(email => email !== emailToDelete))

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setHasInteracted(true)
        if (name === 'subject') setSubject(value)
        if (name === 'to') setEmail(value)
        if (name === 'message') setMessage(value)
        debouncedSaveDraft()
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
                            onChange={handleInputChange}
                            value={subject} />
                        { }
                        <div className={styles.addSection} >
                            <InputWrapper title={'To'}
                                name={'to'}
                                type={'email'}
                                style={{ display: 'flex' }}
                                titleStyle={true}
                                value={email}
                                onChange={handleInputChange}
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
                        <MessageInputBox name={'message'} value={message} onChange={handleInputChange} />
                        <div className={styles.sendDraftContainer} style={{ alignSelf: 'end' }}>
                            <MessageButton wrap={true} title={'Draft'} icon={<TfiWrite />} type={'button'} handleClick={() => handleDraftClick()} />
                            <MessageButton wrap={true} title={'Send'} icon={<IoPaperPlane />} type={'submit'} />
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
