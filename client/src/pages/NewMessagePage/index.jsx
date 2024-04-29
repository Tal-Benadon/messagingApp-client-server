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
import { useNavigate, useParams } from 'react-router-dom';
import { useRefresh } from '../../context/RefreshContext';
import { useUser } from '../../context/UserContext';
import { BiSolidTrashAlt } from "react-icons/bi";

import ButtonsHeaderFooter from '../../components/ButtonsHeaderFooter';
import DropDownOptions from '../../components/DropDownOptions';
export default function NewMessagePage() {
    const { setRefreshCount } = useRefresh()
    const nav = useNavigate()
    const { togglePopup } = usePopup()
    const [emailsList, setEmailsList] = useState([])
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [isDraftPage, setIsDraftPage] = useState(false)
    const [message, setMessage] = useState('')
    const [pageTitle, setPageTitle] = useState('Create a new chat')
    const [draftId, setDraftId] = useState(null) // TO DO, FIRST BOUNCER CREATES THE DRAFT, AFTER THAT EACH BOUNCE UPDATES IT
    const [dataBaseMails, setDataBaseMails] = useState([])
    const [hasInteracted, setHasInteracted] = useState(false)
    const { data, loading } = useAxiosReq({ method: "GET", url: 'user/database-emails' })
    const filter = email ? dataBaseMails.filter(mail => mail.email.includes(email) && !emailsList.includes(mail.email)) : []
    const { chatId } = useParams()
    const { user } = useUser()

    useEffect(() => {
        if (location.pathname === `/messages/draft/draft-edit/${chatId}`) {
            setIsDraftPage(true)
            setPageTitle('Edit Draft')
        }
    }, [])

    useEffect(() => {
        if (location.pathname === `/messages/draft/draft-edit/${chatId}`) {
            const fetchData = async () => {
                try {
                    const draftData = await apiCall({ method: "GET", url: `chat/${chatId}/messages` })
                    console.log("hi", draftData);
                    setDraftId(draftData._id)
                    if (draftData.msg[0]) {
                        setMessage(draftData.msg[0].content)
                    }
                    if (draftData.subject) {
                        setSubject(draftData.subject)
                    }
                    if (draftData.members.length > 0) {
                        const draftMailList = []
                        console.log(user._id);
                        draftData.members.forEach(member => {
                            console.log(member);
                            if (member === user._id) return //If Id is of the user, dont search it

                            const dataBaseUser = dataBaseMails.find(data => data._id === member)
                            console.log(dataBaseUser);
                            draftMailList.push(dataBaseUser.email)
                        })
                        setEmailsList(draftMailList)


                    }
                } catch (error) {
                    console.error(error);
                }
            }
            fetchData()
        }
    }, [chatId])
    const createDraft = async () => {
        console.log('Creating Draft:', { subject, emailsList, message });
        const membersIdList = swapEmailForId()
        const newChat = createChatObj(membersIdList)
        const result = await apiToastCall({ method: 'POST', url: 'chat/create-draft', body: newChat, pending: 'Saving Draft...', success: 'Draft Saved', error: "An error occured while creating" })
        const draftDataId = result.data.draft._id
        console.log(draftDataId);
        setDraftId(draftDataId)

    }

    const updateDraft = async () => {
        if (isDraftPage) {
            return
        }
        console.log('Updating Draft', { subject, emailsList, message, draftId });
        const membersIdList = swapEmailForId()
        const newChat = createChatObj(membersIdList)
        const result = await apiToastCall({ method: 'PUT', url: `chat/update-draft`, body: { ...newChat, draftId }, pending: 'Updating Draft...', success: 'Draft Updated', error: "An error occured while creating" })
    }

    const saveDraft = () => {
        if (hasInteracted) {
            if (draftId) {
                updateDraft()
                setHasInteracted(false)
            } else {
                createDraft()
                setHasInteracted(false)
            }
        }
    }

    const debouncedSaveDraft = useMemo(() => debounce(saveDraft, 3000), [saveDraft, hasInteracted]);

    useEffect(() => {

        debouncedSaveDraft()
        return () => {
            debouncedSaveDraft.cancel()
        }

    }, [debouncedSaveDraft])

    useEffect(() => {
        if (data) {
            const newData = data.filter(emailObj => emailObj._id !== user._id)
            setDataBaseMails(newData)
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
                from: user._id
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
        if (isDraftPage) {
            const result = await apiToastCall({ method: "PUT", url: `chat/${chatId}/send-draft`, pending: 'Creating Chat', success: 'Chat Created', error: "An error occured while creating" })
            setRefreshCount(prev => prev + 1)
            nav('/messages/draft')

        } else {
            if (draftId) {
                const result = await apiToastCall({ method: "PUT", url: `chat/${draftId}/send-draft`, pending: 'Creating Chat', success: 'Chat Created', error: "An error occured while creating" })
            } else {
                const result = await apiToastCall({ method: 'POST', url: 'chat/create-send', body: newChat, pending: 'Creating Chat', success: 'Chat Created!', error: "An error occured while creating" })
            }
        }
        // console.log(result);
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
        if (isDraftPage) {
            const result = await apiToastCall({ method: 'PUT', url: 'chat/update-draft', body: { ...newChat, draftId }, pending: 'Saving Draft', success: 'Draft Saved', error: "An error occured while saving" })
            setRefreshCount(prev => prev + 1)
            return
        }
        setEmailsList([])
        setSubject('')
        setMessage('')
        const result = await apiToastCall({ method: 'POST', url: 'chat/create-draft', body: newChat, pending: 'Creating Draft', success: 'Draft Created', error: "An error occured while creating" })
        return
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

    const handleDeleteDraft = async (draftId) => {
        await apiCall({ method: "DELETE", url: `chat/${draftId}/delete-draft` })
        setRefreshCount(prev => prev + 1)
        nav('/messages/draft')
    }

    return (
        <div className={styles.newChatContainer}>


            {
                isDraftPage ?
                    <div className={styles.draftHeader}>
                        <div>something</div>
                        <div className={styles.newChatTitle}>{pageTitle}</div>
                        <div className={styles.draftEditIcons}>
                            <ButtonsHeaderFooter icon={<BiSolidTrashAlt />} onClickHandle={() => togglePopup('Are you sure?', 'Do you wish to delete this draft?', () => handleDeleteDraft(draftId))} />
                            <DropDownOptions />
                        </div>
                    </div>
                    : <div className={styles.newChatTitle}>{pageTitle}</div>
            }

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
                            <MessageButton wrap={true} title={isDraftPage ? 'Save' : 'Draft'} icon={<TfiWrite />} type={'button'} handleClick={() => createDraftClick()} />
                            <MessageButton wrap={true} title={'Send'} icon={<IoPaperPlane />} type={'submit'} />
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
