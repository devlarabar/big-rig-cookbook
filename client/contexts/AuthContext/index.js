"use client"

import React, { createContext, useContext } from "react"
import useProvideAuth from "./useProvideAuth"

const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider
