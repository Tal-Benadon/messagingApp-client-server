import React, { useState } from 'react'
import styles from './styles.module.css'
import Content from './Content'
import MailboxSidebar from './MailboxSidebar'
import MainSideBar from './MainSideBar'
import defaultImg from '../assets/defaultImg.jpg'
import InboxMessagesList from './InboxMessagesList'
import { Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import NewMessagePage from '../pages/NewMessagePage'
// import OpenedMessage from '../components/OpenedMessage'


export default function Layout() {



    return (
        <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route element={<MainSideBar />}>
                <Route index element={<>home</>} />
                <Route path='speed' element={<>speed?</>} />
                <Route path='task' element={<>task?</>} />
                <Route path='overview' element={<>overview?</>} />
                <Route path='data' element={<>data?</>} />
                <Route path='video' element={<>video?</>} />
                <Route path='messages' element={<MailboxSidebar />} >
                    <Route path='new-chat' element={<NewMessagePage />} />
                    <Route path=':chatType' element={<InboxMessagesList />}>
                        <Route path=':chatId' element={<Content />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}
