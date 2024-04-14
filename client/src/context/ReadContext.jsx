import { createContext, useContext, useState } from "react"

const ReadContext = createContext()


export const ReadProvider = ({ children }) => {
    const [unreadChats, setUnreadChats] = useState(0)


    return (
        <ReadContext.Provider value={{ unreadChats, setUnreadChats }}>
            {children}
        </ReadContext.Provider>
    )

}

export const useRead = () => useContext(ReadContext)
