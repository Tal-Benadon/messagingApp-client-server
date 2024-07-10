import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { TiDeviceDesktop } from "react-icons/ti";
import { SlSpeedometer } from "react-icons/sl";
import { BiTask } from "react-icons/bi";
import { GiEvilEyes } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { BsBarChartFill } from "react-icons/bs";
import { BiSolidVideo } from "react-icons/bi";
import SideBarsButton from '../../components/SideBarsButton';
import defaultImg from '../../assets/defaultPlaceholder.webp'
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import apiCall from '../../Helpers/api';
export default function MainSideBar() {
    const nav = useNavigate()

    const { user, setUser } = useUser()

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
                <img src={user.avatar ? user.avatar : defaultImg} className='avatarImg' alt="User Image" />
            </div>
            <Outlet />
        </div>
    )
}
