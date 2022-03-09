import React, { useContext, useState, useEffect } from 'react'
import { createUser, firebaseAuth, signinUser, signoutUser } from '../utils/firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    async function signup(email, password) {
        return await createUser(email, password);;
    }

    async function login(email, password) {
        return await signinUser(email, password);
    }

    async function logout() {
        return await signoutUser();
    }

    useEffect(() => {
        const unsubscriber = firebaseAuth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        });

        return unsubscriber;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}