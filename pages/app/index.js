import {AuthLayout} from "../../components/layouts/AuthLayout";
import {useAuth} from "../../contexts/AuthContext";
import StoreConnect from "../../components/StoreConnect";
import MyThemes from "../../components/MyThemes";
import {useState} from "react";
import Drafts from "../../components/Drafts";

export default function App(props) {

    const { currentUser, accountInfo, fetchAccountInfo } = useAuth();

    if (!accountInfo || !accountInfo.store) {
        return (
            <AuthLayout>
                <StoreConnect />
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <p>Your store: <a href={`https://${accountInfo.store.storeDomain.split(".")[0]}.hydromade.app`} target={"_blank"}><b>{`https://${accountInfo.store.storeDomain.split(".")[0]}.hydromade.app`}</b></a></p>
            <MyThemes />
            <br />
            <Drafts />
        </AuthLayout>
    )

}