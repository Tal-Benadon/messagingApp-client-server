import React, { useState } from 'react'
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
import defaultImg from '../../assets/defaultImg.jpg'
import MessageButton from '../../components/MessageButton';
import FileUpload from '../../components/FileUpload';
import dateTimeFormatting from '../../Helpers/dateTimeFormatting'
import ConversationsTitle from '../../components/ConversationTitle';
import DropDownOptions from '../../components/DropDownOptions';
export default function MessagesChatPage() {
    const fakeData = [{
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        // defaultTo: '/4',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        // defaultTo: '/4',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        // defaultTo: '/4',
        defaultImg
    },]
    const [msgForm, setMsgForm] = useState({})
    const [msgsList, setMsgsList] = useState(fakeData)
    const createMsg = () => {
        const newMsg = {
            defaultUserName: "Tal Ben Adon",
            defaultMsgPreview: msgForm.msgBox,
            defaultDate: dateTimeFormatting.translateDateToString(new Date()),
            defaultHour: dateTimeFormatting.formatTime(new Date())
        }
        return newMsg
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newMsg = createMsg()
        console.log(newMsg);
        setMsgsList((prev) => ([...prev, newMsg]))
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
            <ConversationsTitle />
            <div className={styles.messages}>
                {msgsList.map((data, index) => {
                    return <OpenedMessage key={index} avatarImg={data.defaultImg} userName={data.defaultUserName} msg={data.defaultMsgPreview} hour={data.defaultHour} date={data.defaultDate} />

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