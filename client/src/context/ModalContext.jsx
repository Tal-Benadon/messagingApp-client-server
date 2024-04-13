import React, { createContext, useContext, useState } from 'react'


const ModalContext = createContext()


export const ModalProvider = ({ children }) => {
    const [showPopUp, setShowPopUp] = useState(false)
    const [popupContent, setPopupContent] = useState(null);
    const [popupSubContent, setPopupSubContent] = useState(null);
    const [popupAction, setPopupAction] = useState(() => () => { });

    const togglePopup = (content, subContent, action) => {
        setPopupContent(content)
        setPopupSubContent(subContent)
        setPopupAction(() => action)
        setShowPopUp(!showPopUp)

    }

    const hidePopup = () => setShowPopUp(false)
    return (
        <ModalContext.Provider value={
            {
                showPopUp,
                togglePopup,
                hidePopup,
                popupContent,
                popupAction,
                setPopupSubContent,
                popupSubContent
            }}>
            {children}
        </ModalContext.Provider>
    )
}

export const usePopup = () => useContext(ModalContext)