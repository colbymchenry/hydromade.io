import {useAuth} from "../../../../contexts/AuthContext";
import {AuthLayout} from "../../../../components/layouts/AuthLayout";
import {useState} from "react";
import Fetching from "../../../../components/Fetching";

export default function EditStore() {

    const { currentUser, accountInfo } = useAuth();
    const [loaded, setLoaded] = useState(false);

    return (
        <AuthLayout fullscreen={true}>
            {(!loaded || !accountInfo) && <Fetching />}

            <div className={`d-flex w-100 h-100 justify-content-center align-items-center`}>
                <iframe src={`https://${accountInfo.store.storeDomain.split(".")[0]}.hydromade.app?edit_session${currentUser.token}`} width={1000} height={720} style={!loaded ? { visibility: "hidden" } : {}} onLoad={() => setLoaded(true)}>
                </iframe>
            </div>
        </AuthLayout>
    )
}