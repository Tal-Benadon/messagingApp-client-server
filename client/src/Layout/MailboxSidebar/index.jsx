import React, { useState } from 'react'
import styles from './styles.module.css'
import { MdMoveToInbox } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa6";
import { BsFillStarFill } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiFillHtml5 } from "react-icons/ai";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { HiMail } from "react-icons/hi";

import MailboxButton from '../../components/MailboxButton';
import MessageButton from '../../components/MessageButton';
export default function MailboxSidebar() {
    const [arrowRight, setArrowRight] = useState(false)
    const toggleArrow = () => {
        setArrowRight(!arrowRight)
    }
    const arrowStyle = {
        transform: arrowRight ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
        transformOrigin: 'center',
        color: arrowRight && '#00A389'
    }
    const mailBoxNavData = [
        { icon: <MdMoveToInbox />, text: 'Inbox', to: 'Inbox' },
        { icon: <FaPaperPlane />, text: 'Sent Emails', to: 'sent-emails', },
        { icon: <BsFillStarFill />, text: 'Favourite', to: 'favourite', },
        { icon: <BiSolidPencil />, text: 'Draft', to: 'draft', },
        { icon: <MdDeleteForever />, text: 'Deleted', to: 'deleted' },
    ]
    const moreData = [{ icon: <AiFillHtml5 />, text: 'Extra', to: "100" },
    { icon: <AiFillHtml5 />, text: 'Extra', to: "101" },
    { icon: <AiFillHtml5 />, text: 'Extra', to: "102" },]
    // ,{icon: <MdOutlineArrowForwardIos/>, text:'More' , to: , },


    return (
        // <div className={styles.whitePadding}>

        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <div className={styles.iconDiv}>
                    <MdOutlineKeyboardArrowLeft />
                </div>
                <div className={styles.title}>Mailbox</div>
            </div>
            <hr className={styles.topHr} />
            <MessageButton icon={<HiMail />} title={'New Message'} />
            {mailBoxNavData.map((data, index) => {
                return <MailboxButton key={index}
                    icon={data.icon}
                    text={data.text}
                    to={data.to}
                    readMsg={false}
                />
            })}
            <div className={styles.arrowAndText}>
                <div className={styles.flexing} onClick={toggleArrow}>
                    <div className={styles.menuArrow} style={arrowStyle} >
                        <MdOutlineArrowForwardIos />
                    </div>
                    <div className={styles.textClass} style={{ color: arrowRight && '#00A389' }}>
                        More
                    </div>
                </div>
                <div className={styles.accordion} style={{ gridTemplateRows: arrowRight ? '1fr' : '0fr' }}>
                    <div style={{ overflowY: 'hidden' }}>
                        <div className={styles.content}>
                            {moreData.map((data, index) => {
                                return <MailboxButton key={index}
                                    icon={data.icon}
                                    text={data.text}
                                    to={data.to} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}
