import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { BsFillStarFill } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaFileImage } from "react-icons/fa6";
import { IoPaperPlane } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import ButtonsHeaderFooter from '../../components/ButtonsHeaderFooter';
import OpenedMessage from '../../components/OpenedMessage';
import MessageInputBox from '../../components/MessageInputBox';
import defaultImg from '../../assets/defaultImg.jpg';
import MessageButton from '../../components/MessageButton';
import FileUpload from '../../components/FileUpload';
import dateTimeFormatting from '../../Helpers/dateTimeFormatting'
import ConversationsTitle from '../../components/ConversationTitle';
import DropDownOptions from '../../components/DropDownOptions';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import apiCall from '../../Helpers/api';
// import PopUp from '../../components/PopUp';
import { usePopup } from '../../context/ModalContext';
import api from '../../Helpers/api';
import apiToastCall from '../../Helpers/apiToast';
import { useRefresh } from '../../context/RefreshContext';
import { useUser } from '../../context/UserContext';


export default function MessagesChatPage() {
    const { chatId } = useParams()
    const { chatType } = useParams()
    const [messagesList, setMessagesList] = useState([])
    const [chatSubject, setChatSubject] = useState('Chat Subject')
    const { togglePopup, hidePopup } = usePopup()
    const nav = useNavigate()
    const location = useLocation()
    const { setRefreshCount } = useRefresh()
    const { user } = useUser()



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall({ method: "GET", url: `chat/${chatId}/messages` })
                const subject = response.subject
                const chatMsgs = response.msg.map(msg => {
                    return {
                        avatar: msg.from.avatar,
                        sender: msg.from.fullName,
                        content: msg.content,
                        hour: dateTimeFormatting.formatTime(msg.date),
                        date: dateTimeFormatting.translateDateToString(msg.date),
                        senderId: msg.from._id
                    }
                })
                setMessagesList(chatMsgs)
                setChatSubject(subject)
                console.log(response);

            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [chatId])


    const [msgForm, setMsgForm] = useState({})

    const createMsg = () => {
        const newMsg = {
            sender: user.fullName,
            content: msgForm.msgBox,
            date: dateTimeFormatting.translateDateToString(new Date()),
            hour: dateTimeFormatting.formatTime(new Date()),
            senderId: user._id
        }
        return newMsg
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newMsg = createMsg()
        const msgToServer = { ...newMsg }
        delete msgToServer.hour
        msgToServer.date = new Date()
        const response = await apiCall({ method: "PUT", url: `chat/${chatId}/messages`, body: msgToServer })
        setMessagesList((prev) => ([...prev, newMsg]))
        console.log(msgForm);
        setMsgForm(prevForm => ({
            ...prevForm,
            msgBox: ''
        }));
    }
    const handleOnChange = (event) => {
        const { name, value } = event.target
        setMsgForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleDeleteChat = async (chatId) => {
        const currentPath = location.pathname
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
        console.log(parentPath);
        if (chatType === 'deleted') {
            const result = await apiToastCall({ method: "DELETE", url: `chat/${chatId}/delete-chat`, success: 'Chat deleted', pending: 'Deleting Chat' })
            setRefreshCount(prev => prev + 1)
            nav(parentPath)

        } else {
            const result = await apiToastCall({ method: "DELETE", url: `chat/${chatId}/move-chat`, success: 'Chat Moved', pending: 'Moving Chat' })
            setRefreshCount(prev => prev + 1)
            nav(parentPath)
        }
    }
    const handleRecoverChat = async (chatId) => {
        const currentPath = location.pathname
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
        const result = await apiToastCall({ method: "PUT", url: `chat/${chatId}/restore-chat`, success: 'Chat Restored', pending: 'Restoring Chat' })
        setRefreshCount(prev => prev + 1)
        nav(parentPath)
    }

    let headerIconData = [
        { id: 'star', icon: <BsFillStarFill />, handleOnClick: () => { } },
        { id: 'printer', icon: <AiFillPrinter />, handleOnClick: () => { } },
        { id: 'trash', icon: <BiSolidTrashAlt />, handleOnClick: () => togglePopup('Are you sure?', 'Do you wish to move this chat to "Deleted"?', () => handleDeleteChat(chatId)) },
    ]
    const handleTrashOnclick = () => togglePopup('Are you sure?', 'Do you wish to completely delete this chat?', () => handleDeleteChat(chatId))
    const recoverChatObj = { id: 'plus', icon: <AiOutlinePlus />, handleOnClick: () => togglePopup('Recover Chat?', 'Do you wish to recover this chat?', () => handleRecoverChat(chatId)) }

    if (chatType === 'deleted') {

        headerIconData = headerIconData.map(item => {
            if (item.id === 'star') {
                return recoverChatObj
            } else if (item.id === 'trash') {
                return { ...item, handleOnClick: handleTrashOnclick }
            }
            return item
        })
    }
    console.log(headerIconData);
    const footerIconData = [{ type: 'image' }, { type: 'file' }]
    const footerDeleteOptionsData = [{ icon: <BiSolidTrashAlt /> }, { icon: <BsThreeDotsVertical /> }]
    return (
        <div className={styles.MessagesChatPageContainer}>

            <div className={styles.pageHeader}>
                Special offers
                <div className={styles.iconsContainer}>
                    {headerIconData.map((data, index) => {
                        return <ButtonsHeaderFooter key={index} icon={data.icon} onClickHandle={data.handleOnClick} />
                    })}
                    <DropDownOptions />
                </div>


            </div>
            <hr className={styles.topHr} />
            <ConversationsTitle titleText={chatSubject} />
            <div className={styles.messages}>
                {messagesList.map((data, index) => {
                    return <React.Fragment key={index}><OpenedMessage userId={user._id} senderId={data.senderId} avatarImg={data.avatar} userName={data.sender} msg={data.content} hour={data.hour} date={data.date} />
                        <hr className={styles.msgsHr} />
                    </React.Fragment>

                })}
            </div>
            <form onSubmit={handleSubmit}>
                <MessageInputBox onChange={handleOnChange} value={msgForm['msgBox']} name={'msgBox'} />
                <div className={styles.footerContainer}>
                    <div className={styles.leftsideFooter}>
                        {footerIconData.map((data) => {
                            return <FileUpload key={data.type} type={data.type} />
                        })}
                    </div>
                    <div className={styles.rightsideFooter}>
                        {footerDeleteOptionsData.map((data, index) => {
                            return <ButtonsHeaderFooter key={index} icon={data.icon} />
                        })}
                        <MessageButton icon={<IoPaperPlane />} title={'Send'} wrap={true} type={'submit'} />
                    </div>
                </div>
            </form>
        </div>

    )

}

