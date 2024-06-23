import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import InboxMessage from '../../components/InboxMessage'
import SearchBar from '../../components/SearchBar'
import defaultImg from '../../assets/defaultImg.jpg'
import apiCall from '../../Helpers/api'
import { useParams } from 'react-router-dom'
import messageFormatting from '../../Helpers/messageFormatting'
import dateTimeFormatting from '../../Helpers/dateTimeFormatting'
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development'
import { useRefresh } from '../../context/RefreshContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useUser } from '../../context/UserContext'
import Loading from '../../components/Loading'
export default function InboxMessagesList() {
    const [chatsList, setChatsList] = useState([])
    const { refreshCount } = useRefresh()
    const { chatType } = useParams()
    const [page, setPage] = useState(1)
    const [dataPage, setDataPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useUser()
    useEffect(() => {
        setPage(1)
    }, [chatType])


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await apiCall({ method: "GET", url: `chat/inbox/${chatType}/${page}` })
                console.log(response);
                if (response) {

                    setDataPage(response.pages)
                    const chatList = response.chats.map(chat => {
                        return {
                            namesTitle: messageFormatting(chat.chat.members, user._id),
                            subject: chat.chat.subject,
                            subjectInitial: chat.chat.subject.charAt(0),
                            lastHour: dateTimeFormatting.formatTime(chat.chat.msg[chat.chat.msg.length - 1].date),
                            chatId: chat.chat._id,
                            isRead: chat.isRead,
                            isFavorite: chat.isFavorite
                        }
                    });
                    setChatsList(chatList)
                    setTimeout(() => {
                        setIsLoading(false)

                    }, 1500);
                }


            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [chatType, refreshCount])

    const handleOnClick = async () => {
        setIsLoading(true)
        setPage(prev => prev + 1)

        const response = await apiCall({ method: "GET", url: `chat/inbox/${chatType}/${page + 1}` })
        console.log(response);
        const chatList = response.chats.map(chat => {
            return {
                namesTitle: messageFormatting(chat.chat.members, user._id),
                subject: chat.chat.subject,
                subjectInitial: chat.chat.subject.charAt(0),
                lastHour: dateTimeFormatting.formatTime(chat.chat.msg[chat.chat.msg.length - 1].date),
                chatId: chat.chat._id,
                isRead: chat.isRead,
                isFavorite: chat.isFavorite
            }
        });
        setChatsList(prev => [...prev, ...chatList])
        setIsLoading(false)
    }

    // console.log(chatType);
    // console.log(chatsList);

    return (
        <div className={styles.msgInnerLayout}>

            <div className={styles.padding}>
                <div className={styles.messagesListContainer}>
                    <SearchBar />
                    <hr className={styles.topHr} />
                    {isLoading ? <Loading /> :
                        <div className={styles.links}>
                            {
                                chatsList.map((data) => {
                                    return <InboxMessage key={data.chatId}
                                        chatId={data.chatId}
                                        initial={data.subjectInitial}
                                        userName={data.namesTitle}
                                        subject={data.subject}
                                        sentTime={data.lastHour}
                                        to={chatType === 'draft' ? `draft-edit/${data.chatId}` : data.chatId}
                                        isDrafts={chatType}
                                        isRead={data.isRead}
                                        isFavorite={data.isFavorite}
                                    />
                                })}
                            {
                                dataPage === 0 ? <div className={styles.noChats}>{`No chats in "${chatType}" yet.`}</div> :
                                    (page === dataPage ? '' :
                                        <button className={styles.paginationBtn} onClick={handleOnClick}>
                                            {isLoading ? <LoadingSpinner /> : 'Show more'}
                                        </button>
                                    )
                            }
                        </div>
                    }
                </div>
            </div>
            <Outlet />
        </div>

    )
}
