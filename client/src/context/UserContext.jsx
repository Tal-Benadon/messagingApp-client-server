import { createContext, useContext, useEffect, useState } from 'react'
import apiCall from '../Helpers/api'
const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        if (localStorage.mailBoxToken && !user._id) {
            const tokenToUser = async () => {
                const user = await apiCall({ method: "GET", url: "user/token-to-user" })
                console.log("tokenBecame:", user);
                setUser(user)
            }
            tokenToUser()
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)