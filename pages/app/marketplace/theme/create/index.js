import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {useAuth} from "../../../../../contexts/AuthContext";
import Fetching from "../../../../../components/Fetching";
import {AuthLayout} from "../../../../../components/layouts/AuthLayout";

export default function Marketplace(props) {

    const router = useRouter();
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

    return (
        <AuthLayout>

        </AuthLayout>
    )

}