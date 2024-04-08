import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { BsFillStarFill } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaFileImage } from "react-icons/fa6";
import { IoPaperPlane } from "react-icons/io5";
import ButtonsHeaderFooter from '../../components/ButtonsHeaderFooter';
import OpenedMessage from '../../components/OpenedMessage';
import MessageInputBox from '../../components/MessageInputBox';
import defaultImg from '../../assets/defaultImg.jpg';
import MessageButton from '../../components/MessageButton';
import FileUpload from '../../components/FileUpload';
import dateTimeFormatting from '../../Helpers/dateTimeFormatting'
import ConversationsTitle from '../../components/ConversationTitle';
import DropDownOptions from '../../components/DropDownOptions';
import { useParams } from 'react-router-dom';
import apiCall from '../../Helpers/api';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';

export default function MessagesChatPage() {
    const { chatId } = useParams()
    const [messagesList, setMessagesList] = useState([])
    const [chatSubject, setChatSubject] = useState('Chat Subject')
    // console.log(chatId);


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
                // response.forEach(message => {
                //     message.hour = dateTimeFormatting.formatTime(message.date)
                //     message.date = dateTimeFormatting.translateDateToString(message.date)
                //     if (message.senderId === '660e9b7ffd6968d3bfa0ce16') {
                //         message.you = true
                //     }
                // });

                // setMessagesList(response)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [chatId])


    const [msgForm, setMsgForm] = useState({})

    const createMsg = () => {
        const newMsg = {
            sender: "Tal Ben Adon",
            content: msgForm.msgBox,
            date: dateTimeFormatting.translateDateToString(new Date()),
            hour: dateTimeFormatting.formatTime(new Date()),
            senderId: "660e9b7ffd6968d3bfa0ce16"
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

    const headerIconData = [
        { icon: <BsFillStarFill /> },
        { icon: <AiFillPrinter /> },
        { icon: <BiSolidTrashAlt /> },
    ]
    const footerIconData = [{ type: 'image' }, { type: 'file' }]
    const footerDeleteOptionsData = [{ icon: <BiSolidTrashAlt /> }, { icon: <BsThreeDotsVertical /> }]
    return (
        <div className={styles.MessagesChatPageContainer}>

            <div className={styles.pageHeader}>
                Special offers
                <div className={styles.iconsContainer}>
                    {headerIconData.map((data, index) => {
                        return <ButtonsHeaderFooter key={index} icon={data.icon} />
                    })}
                    <DropDownOptions />
                </div>
            </div>
            <hr className={styles.topHr} />
            <ConversationsTitle titleText={chatSubject} />
            <div className={styles.messages}>
                {messagesList.map((data, index) => {
                    return <React.Fragment key={index}><OpenedMessage userId={"660e9b7ffd6968d3bfa0ce16"} senderId={data.senderId} avatarImg={data.avatar} userName={data.sender} msg={data.content} hour={data.hour} date={data.date} />
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