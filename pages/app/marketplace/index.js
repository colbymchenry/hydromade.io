import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import StripeConnect from "../../../components/StripeConnect";
import GithubConnect from "../../../components/GithubConnect";
import {useAuth} from "../../../contexts/AuthContext";
import {AuthLayout} from "../../../components/layouts/AuthLayout";
import MarketplaceThemes from "../../../components/MarketplaceThemes";
import Fetching from "../../../components/Fetching";
import {BarLoader} from "react-spinners";
import MyThemes from "../../../components/MyThemes";

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

    useEffect(async () => {
        if (accountInfo) {
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has("code")) {
                try {
                    const res = await axios.get(`/api/github/connect?uid=${currentUser.uid}&code=${searchParams.get("code")}`);
                    await fetchAccountInfo();
                    router.push('/app/marketplace')
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }, [accountInfo])

    if (!accountInfo) return (
        <AuthLayout>
            <Fetching />
        </AuthLayout>
    )

    return (
        <AuthLayout>
            <MarketplaceThemes />
            <br />
            <MyThemes accountInfo={accountInfo} fetchAccountInfo={fetchAccountInfo} />
        </AuthLayout>
    )

}