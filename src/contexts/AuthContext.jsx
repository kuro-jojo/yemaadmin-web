import React, { useEffect, useState } from 'react'
import { loginWithEmailAndPassword, onAuthStateChange, resetPasswordWithEmail, signOut } from '../api/auth'
import {AuthContext} from './hooks'


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const unsuscribe = onAuthStateChange(user => {
            setIsLoading(false)
            setCurrentUser(user)
        })
        return unsuscribe
    }, [])

    function login(email, password) {
        return loginWithEmailAndPassword(email, password)
    }

    function resetPassword(email) {
        return resetPasswordWithEmail(email)
    }

    function logout() {
        signOut()
            .catch((error) => {
                console.log(error)
            })
    }

    const value = {
        currentUser,
        login,
        logout,
        resetPassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

