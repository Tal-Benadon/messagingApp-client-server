import React from 'react'
import styles from './styles.module.css'
import InboxMessage from '../../components/InboxMessage'
import SearchBar from '../../components/SearchBar'
import defaultImg from '../../assets/defaultImg.jpg'
export default function InboxMessagesList() {

    const conversationsList = [{
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '0',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '1',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '2',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '3',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '5',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '6',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '7',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '8',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/9',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/10',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/11',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/12',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/13',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/14',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/15',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/16',
        defaultImg
    }, {
        defaultUserName: "Tal Ben Adon",
        defaultMsgPreview: "Hey, I really need these documents bggggggggggg gggggggggggg ggggggggg gggggggggggg gggggggggg gggggggggggggggg gggggggggggg ggggggggg ggggg ggggggggggggggggggggggggg ggggggy tomorrow.",
        defaultDate: "24.3.2024",
        defaultHour: "4:20",
        defaultTo: '/17',
        defaultImg
    },]
    return (
        <div className={styles.padding}>

            <div className={styles.messagesListContainer}>
                <SearchBar />
                <hr className={styles.topHr} />
                {/* div */}
                <div className={styles.links}>
                    {conversationsList.map((data, index) => {
                        return <InboxMessage key={index}
                            avatarImg={data.defaultImg}
                            userName={data.defaultUserName}
                            msgPreview={data.defaultMsgPreview}
                            sentTime={data.defaultHour}
                            to={data.defaultTo}
                        // setReadMsg={setReadMsg}
                        // readMsg={readMsg}
                        />
                    })}
                </div>
            </div>
        </div>

    )
}
