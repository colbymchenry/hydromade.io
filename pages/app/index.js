import {AuthLayout} from "../../components/layouts/AuthLayout";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import axios from "axios";
import StripeConnect from "../../components/StripeConnect";
import GithubConnect from "../../components/GithubConnect";
import {useRouter} from "next/router";
import Themes from "../../components/Themes";

export default function App(props) {

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

    useEffect(async () => {
        if (accountInfo) {
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has("code")) {
                try {
                    const res = await axios.get(`/api/github/connect?uid=${currentUser.uid}&code=${searchParams.get("code")}`);
                    await fetchAccountInfo();
                    router.push('/app')
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }, [accountInfo])

    if (!accountInfo) return <></>

    if (accountInfo.stripe_url) {
        return (
            <AuthLayout>
                <StripeConnect url={accountInfo.stripe_url} requirements={accountInfo.requirements} />
            </AuthLayout>
        )
    }

    if (!accountInfo.user.github_access_token) {
        return (
            <AuthLayout>
                <GithubConnect />
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <Themes />
        </AuthLayout>
    )

}