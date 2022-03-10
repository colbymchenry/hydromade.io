import {AuthLayout} from "../../components/layouts/AuthLayout";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import axios from "axios";
import StripeConnect from "../../components/StripeConnect";

export default function App(props) {

    const { currentUser } = useAuth();
    const [accountInfo, setAccountInfo] = useState();

    useEffect(async () => {
        if (!accountInfo) {
            try {
                const res = await axios.get(`/api/users/fetch?uid=${currentUser.uid}`);
                setAccountInfo(res.data)
            } catch (error) {
                console.error(error)
            }
        }
    }, []);

    if (!accountInfo) return <></>

    if (accountInfo?.stripe_url) {
        return (
            <AuthLayout>
                <StripeConnect url={accountInfo.stripe_url} />
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <h1>TEST</h1>
        </AuthLayout>
    )

}