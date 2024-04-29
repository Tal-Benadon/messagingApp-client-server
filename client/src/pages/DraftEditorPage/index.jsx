// import React, { useEffect, useState } from 'react'
// import styles from './styles.module.css'
// import useAxiosReq from '../../hooks/useAxiosReq'
// import { useParams } from 'react-router-dom'
// export default function DraftEditorPage() {
//     const { chatId } = useParams()
//     const { data: emailsData, loading: emailLoading } = useAxiosReq({ method: "GET", url: 'user/database-emails' })
//     const { data: chatData } = useAxiosReq({ method: "GET", url: `chat/${chatId}/messages` })
//     console.log(chatData);
//     useEffect(() => {
//         if (chatData) {
//             if (chatData.msg[0]) {
//                 setMessage(chatData.msg[0].content)
//             }
//             if (chatData.subject) {
//                 setSubject(chatData.subject)
//             }
//             if (chatData.members.length > 1) {
//                 console.log(chatData.members);
//                 const userIndex = chatData.members.indexOf(member => member === '660e9b7ffd6968d3bfa0ce16')
//                 if (userIndex > -1) {
//                     chatData.members.splice(userIndex, 1)
//                     setUserIdList(chatData.members)
//                 }
//             }
//         }
//     }, [chatId, chatData])

//     const [userIdList, setUserIdList] = useState([])
//     const [emailsList, setEmailsList] = useState([])
//     const [email, setEmail] = useState('')
//     const [subject, setSubject] = useState('')
//     const [message, setMessage] = useState('')
//     // const filter = email ? dataBaseMails.filter(mail => mail.email.includes(email) && !emailsList.includes(mail.email)) : []

//     return (
//         <div className={styles.editDraftContainer}>
//             <div className={styles.newChatTitle}>Edit Draft</div>
//         </div>
//     )
// }
