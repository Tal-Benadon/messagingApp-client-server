import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { usePopup } from './context/ModalContext';
import PopUp from './components/PopUp';
import Backdrop from './components/Backdrop';
export default function App() {
  const { showPopUp, hidePopup, popupContent, popupAction, popupSubContent, setShowPopup, popupCloseAction } = usePopup()
  // console.log(import.meta.env.VITE_API_URL);

  return (
    <>
      <div className='appConfinement'>

        <Backdrop show={showPopUp} />
        <PopUp show={showPopUp} onClose={hidePopup} action={popupAction} subContent={popupSubContent} negativeAction={popupCloseAction}>
          {popupContent}
        </PopUp>
        <Layout />
        <ToastContainer />
      </div>
    </>
  )
}

