import {AuthLayout} from "../../components/layouts/AuthLayout";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import axios from "axios";
import StoreConnect from "../../components/StoreConnect";
import MyThemes from "../../components/MyThemes";
import Fetching from "../../components/Fetching";

export default function App(props) {

    const { currentUser } = useAuth();
    const [accountInfo, setAccountInfo] = useState();

    const fetchAccountInfo = async () => {
        try {
            const res = await axios.get(`/api/users/fetch?uid=${currentUser.uid}`);
            setAccountInfo(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect( () => {
        if (!accountInfo) fetchAccountInfo();
    }, []);

    if (!accountInfo) return (
        <AuthLayout>
            <Fetching />
        </AuthLayout>
    )

    if (!accountInfo.store) {
        return (
            <AuthLayout>
                <StoreConnect fetchAccountInfo={fetchAccountInfo} />
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <MyThemes />
        </AuthLayout>
    )

}