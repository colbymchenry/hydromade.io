import {useAuth} from "../../contexts/AuthContext";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import {sendEmailVerification} from "firebase/auth";

export function AuthLayout(props) {

    const router = useRouter();
    const { currentUser } = useAuth();
    const [buttonLabel, setButtonLabel] = useState("Resend verification email")

    useEffect(() => {
        if (!currentUser) router.push("/")
    }, [router.pathname])

    if (currentUser && !currentUser.emailVerified) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh'}}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-center">Please verify your email.<br /><b>{currentUser.email}</b></h1>
                    <div className={"mt-4"}>
                        <ButtonSubmit type="button" label={buttonLabel} className="btn-black" style={{ width: '370px' }} onClick={async () => {
                            if (buttonLabel === "Refresh Page") {
                                location.reload();
                                return;
                            }

                            await sendEmailVerification(currentUser);
                            setButtonLabel("Verification email sent!");
                            setTimeout(() => setButtonLabel("Refresh Page"), 30000)
                        }}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-5">
            {props.children}    
        </div>
    )

}