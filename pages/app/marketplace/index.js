import {useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {useAuth} from "../../../contexts/AuthContext";
import {AuthLayout} from "../../../components/layouts/AuthLayout";
import MarketplaceThemes from "../../../components/MarketplaceThemes";
import MyThemes from "../../../components/MyThemes";

export default function Marketplace(props) {

    const router = useRouter();
    const { currentUser, accountInfo, fetchAccountInfo } = useAuth();

    useEffect(async () => {
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
    }, [accountInfo])

    return (
        <AuthLayout>
            <MarketplaceThemes />
            <br />
            <MyThemes accountInfo={accountInfo} fetchAccountInfo={fetchAccountInfo} />
        </AuthLayout>
    )

}