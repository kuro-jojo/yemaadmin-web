// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useAuth } from '../../contexts/hooks'
import { Outlet, redirect } from 'react-router-dom'
import NavBar from '../NavBar'


export default function ProtectedRoute() {
    const { currentUser } = useAuth()
    if (!currentUser) {
        redirect("/login")
    }
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}