import React, { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(
        !!localStorage.getItem('accessToken')
    )
  return (
    <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }