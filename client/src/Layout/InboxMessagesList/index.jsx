import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import InboxMessage from '../../components/InboxMessage'
import SearchBar from '../../components/SearchBar'
import defaultImg from '../../assets/defaultImg.jpg'
import apiCall from '../../Helpers/api'
import { useParams } from 'react-router-dom'
import messageFormatting from '../../Helpers/messageFormatting'
import dateTimeFormatting from '../../Helpers/dateTimeFormatting'
export default function InboxMessagesList() {
    const [chatsList, setChatsList] = useState([])
    const { chatType } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall({ method: "GET", url: `chat/inbox/${chatType}` })

                const chatList = response.map(chat => {
                    return {
                        namesTitle: messageFormatting(chat.chat.members, '660e9b7ffd6968d3bfa0ce16'),
                        subject: chat.chat.subject,
                        subjectInitial: chat.chat.subject.charAt(0),
                        lastHour: dateTimeFormatting.formatTime(chat.chat.msg[chat.chat.msg.length - 1].date),
                        chatId: chat.chat._id
                    }
                });
                setChatsList(chatList)
                console.log(chatList);

            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [chatType])



    return (
        <div className={styles.padding}>

            <div className={styles.messagesListContainer}>
                <SearchBar />
                <hr className={styles.topHr} />
                {/* div */}
                <div className={styles.links}>
                    {chatsList.map((data, index) => {
                        return <InboxMessage key={index}
                            // chat id
                            initial={data.subjectInitial}
                            userName={data.namesTitle}
                            subject={data.subject}
                            sentTime={data.lastHour}
                            to={data.chatId} // turn into CHAT ID 
                        // setReadMsg={setReadMsg}
                        // readMsg={readMsg}
                        />
                    })}
                </div>
            </div>
        </div>

    )
}
