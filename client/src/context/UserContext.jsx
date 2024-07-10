import { createContext, useContext, useEffect, useState } from 'react'
import apiCall from '../Helpers/api'
const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)