import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { TiDeviceDesktop } from "react-icons/ti";
import { SlSpeedometer } from "react-icons/sl";
import { BiTask } from "react-icons/bi";
import { GiEvilEyes } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { BsBarChartFill } from "react-icons/bs";
import { BiSolidVideo } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import SideBarsButton from '../../components/SideBarsButton';
import defaultImg from '../../assets/defaultPlaceholder.webp'
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import apiCall from '../../Helpers/api';
import { usePopup } from '../../context/ModalContext';
export default function MainSideBar() {
    const nav = useNavigate()
    const { user, setUser } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const { togglePopup } = usePopup()
    const menuRef = useRef(null)
    useEffect(() => {
        if (!localStorage.mailBoxToken) {
            return (
                nav('/login')
            )
        }
        if (localStorage.mailBoxToken && !user._id) {
            const tokenToUser = async () => {
                const user = await apiCall({ method: "GET", url: "user/token-to-user" })
                if (user.status === 401) {
                    localStorage.removeItem('mailBoxToken')
                    nav('/login')
                }
                console.log("tokenBecame:", user);
                setUser(user)
            }
            tokenToUser()
            console.log(user);
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // handleOnClick: () => togglePopup('Are you sure?', 'Do you wish to move this chat to "Deleted"?', () => handleDeleteChat(chatId))

    const onLogOut = () => {
        localStorage.removeItem('mailBoxToken')
        nav('/login')
    }

    const handleLogoutClick = () => togglePopup('Are you sure?', 'Do you wish to log out?', () => onLogOut())


    const sideBarButtonData = [
        { icon: <SlSpeedometer />, to: 'speed' }
        , { icon: <BiTask />, to: 'task' },
        { icon: <GiEvilEyes />, to: 'overview' }
        , { icon: <IoIosPeople />, to: 'messages' },
        { icon: <BsBarChartFill />, to: 'data' },
        { icon: <BiSolidVideo />, to: 'video' }
    ]



    return (
        <div className={styles.layout}>
            <div className={styles.mainSideBarContainer}>
                <TiDeviceDesktop className={styles.appIcon} />
                <div className={styles.iconBundle}>
                    {sideBarButtonData.map((data, index) => {
                        return <SideBarsButton key={index} icon={data.icon} to={data.to} />
                    })}
                </div>
                <div className={styles.imgWrapper} onClick={() => setIsOpen(!isOpen)} ref={menuRef}>
                    <img src={user.avatar ? user.avatar : defaultImg} className={`avatarImg ${styles.sideBarImg}`} alt="User Image" />
                    <ul className={`${styles.menu} ${isOpen ? styles.open : ''}`} ref={menuRef}>
                        <li><i><IoMdSettings /></i>Settings</li>

                        <hr className={styles.hr} />
                        <li onClick={handleLogoutClick}><i><CiLogout /></i>Log Out</li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
