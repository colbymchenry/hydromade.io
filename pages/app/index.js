import {AuthLayout} from "../../components/layouts/AuthLayout";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import axios from "axios";
import StoreConnect from "../../components/StoreConnect";
import MyThemes from "../../components/MyThemes";
import Fetching from "../../components/Fetching";

export default function App(props) {

    const { currentUser, accountInfo, fetchAccountInfo } = useAuth();

    if (accountInfo && !accountInfo.store) {
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