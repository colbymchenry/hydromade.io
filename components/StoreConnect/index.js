import styles from './styles.module.css'
import {useState} from "react";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import {useSpring, animated} from "react-spring";
import {useAuth} from "../../contexts/AuthContext";
import axios from "axios";

export default function StoreConnect() {

    const { currentUser, fetchAccountInfo } = useAuth();
    const [accessKey, setAccessKey] = useState("");
    const [storeAddress, setStoreAddress] = useState("")
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(0);

    const slideIn = (delay) => useSpring({
        from: {
            marginLeft: "100vw"
        },
        to: {
            marginLeft: "0"
        },
        delay
    });

    const slideAway = (delay) => useSpring({
        from: {
            marginLeft: "0"
        },
        to: {
            marginLeft: "-100vw"
        },
        onRest: () =>  setStep(2),
        delay
    });

    const createStore = async () => {
        try {
            const res = await axios.post(`/api/stores/create?uid=${currentUser.uid}`, {
                storeDomain: storeAddress, accessToken: accessKey
            });

            fetchAccountInfo()
        } catch (err) {
            console.error(err);
        }
    }

    if (step < 2) {
        return (
            <animated.div style={step === 1 ? slideAway(20) : useSpring({})}
                          className={"d-flex flex-column " + styles.main}>
                <h3 className={`mb-4`}>To deploy a theme connect your Shopify store.</h3>
                <video controls src={"/storefront_access_token.mp4"}/>
                <small>Apps > Develop apps > Allow custom app development > Create an app > Install app</small>
                <br/>
                <div className={"d-flex w-50"}>
                    <input type={"text"} className="form-control" value={accessKey}
                           onChange={(e) => setAccessKey(e.target.value)} placeholder={"Storefront Access Token"}/>
                    <ButtonSubmit onClick={() => setStep(1)} className="btn-black" type={"button"} disabled={!accessKey} style={{marginLeft: '1rem'}}/>
                </div>
                <br/>
                <h5 className={`w-75`}>In order to access your store's data through the API, you'll need to create a
                    private app inside your Shopify store and click on the checkbox to generate a Storefront API
                    access token.</h5>
                <div className={`d-flex flex-column align-items-start mt-4`}>
                    <p>1. Click on <b>'Apps'</b> in your admin sidebar</p>
                    <p>3. Click on <b>'Develop apps'</b></p>
                    <p>4. Click on <b>'Allow custom app development'</b></p>
                    <p>5. Click on <b>'Create an app'</b></p>
                    <p>6. Add in an app name (the name can simply be 'Hydromade')</p>
                    <p>7. Click on <b>'Configure Storefront API scopes'</b></p>
                    <p>8. Select all of the checkboxes</p>
                    <p>9. Click on <b>'Save'</b></p>
                    <p>10. Click on <b>'Install app'</b></p>
                </div>
            </animated.div>
        )
    } else {
        return (
            <animated.div style={step === 2 ? slideIn(1) : useSpring({})}
                          className={"d-flex flex-column " + styles.main}>
                <h3 className={`mb-4`}>Last step, your store address.</h3>
                <div className={"d-flex w-50"}>
                    <input type={"text"} className="form-control" value={storeAddress}
                           onChange={(e) => setStoreAddress(e.target.value)} placeholder={"mystore.myshopify.com"}/>
                    <ButtonSubmit onClick={createStore} className="btn-black" type={"button"} disabled={!storeAddress} style={{marginLeft: '1rem'}}/>
                </div>
            </animated.div>
        )
    }

}