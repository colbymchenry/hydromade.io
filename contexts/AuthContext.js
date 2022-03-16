import React, { useContext, useState, useEffect } from 'react'
import { createUser, firebaseAuth, signinUser, signoutUser } from '../utils/firebase'
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [accountInfo, setUserData] = useState(undefined);
    const [loading, setLoading] = useState(true);

    async function signup(email, password) {
        return await createUser(email, password);
    }

    async function login(email, password) {
        return await signinUser(email, password);
    }

    async function logout() {
        await signoutUser();
    }

    async function fetchAccountInfo(user) {
        try {
            const res = await axios.get(`/api/users/fetch?uid=${user ? user.uid : currentUser.uid}`);
            setUserData(res.data);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const unsubscriber = firebaseAuth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            await fetchAccountInfo(user);
            setTimeout(() => setLoading(false), 4000);
        });

        return unsubscriber;
    }, [])

    const value = {
        currentUser,
        loading,
        accountInfo,
        fetchAccountInfo,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}