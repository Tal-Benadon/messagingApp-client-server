import React from 'react'
import styles from './styles.module.css'
import { TiDeviceDesktop } from "react-icons/ti";
import { SlSpeedometer } from "react-icons/sl";
import { BiTask } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import { GiEvilEyes } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { SlPeople } from "react-icons/sl";
import { BsBarChartFill } from "react-icons/bs";
import { BiSolidVideo } from "react-icons/bi";
import SideBarsButton from '../../components/SideBarsButton';
import defaultImg from '../../assets/defaultImg.jpg'
import { Outlet } from 'react-router-dom';
export default function MainSideBar() {

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
                <img src={defaultImg} className='avatarImg' alt="User Image" />
            </div>
            <Outlet />
        </div>
    )
}
