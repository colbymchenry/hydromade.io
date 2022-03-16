import {useAuth} from "../../../../contexts/AuthContext";
import {useState} from "react";
import {AuthLayout} from "../../../../components/layouts/AuthLayout";

export default function EditStore(props) {

    const { currentUser, accountInfo } = useAuth();
    const [loaded, setLoaded] = useState(false);

    const url = (accountInfo && currentUser) ? `${accountInfo.store.storeDomain.split(".")[0]}.hydromade.app?edit_session${currentUser.token}` : null;

    return (
        <AuthLayout fullscreen={true}>
            <div className={`d-flex w-100 h-100 justify-content-center align-items-center`}>
                <iframe src={url} width={1000} height={720} style={!loaded ? { visibility: "hidden" } : {}} onLoad={() => setLoaded(true)}>
                </iframe>
            </div>
        </AuthLayout>
    )
}