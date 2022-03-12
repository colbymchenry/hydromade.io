import styles from './styles.module.css'
import {useSpring, animated} from "react-spring";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../contexts/AuthContext";
import FontAwesomeIcon from "../FontAwesomeIcon";
import {faLock, faSpinner, faTimes} from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Swal from "sweetalert2";

export function DeployModal(props) {

    const [closing, setClosing] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({})
    const { currentUser } = useAuth();

    const comeFromAbove = (delay) => useSpring({
        from: {
            marginTop: '-100vh'
        },
        to: {
            marginTop: '0vh'
        },
        delay
    });

    const goAwayAbove = (delay) => useSpring({
        to: {
            marginTop: '-100vh'
        },
        from: {
            marginTop: '0vh'
        },
        delay
    });

    const deploy = async () => {
        setProcessing(true);

        if (name.length < 6) {
            setErrors((errors) => {
                errors['name'] = true;
                return errors;
            })
            setProcessing(false);
            return;
        }

        try {
            const res = await axios.post(`/api/themes/create?uid=${currentUser.uid}`, {
                name, price, repo: selectedRepo
            });

            Swal.fire({
                title: "Theme Created!",
                showConfirmButton: false,
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                position: 'top-right'
            })

            setClosing(true);
            setTimeout(() => {
                props.setCreatingTheme(false);
                props.fetchThemes();
            }, 500);
        } catch (err) {
            console.error(err);
        }

        setProcessing(false);
    }

    return (
        <>
        <div className={`overlay`}></div>
        <animated.div style={closing ? goAwayAbove(200) : comeFromAbove(200)} className={styles.newThemeModel}>
            <div className={`d-flex justify-content-end w-100 ${styles.close}`}>
                <FontAwesomeIcon icon={faTimes} onClick={() => {
                    setClosing(true);
                    setTimeout(() => props.setCreatingTheme(false), 500);
                }}/>
            </div>
            <h5>Select your GitHub repo:</h5>
            <small className={`mb-3`}>Only import repos built off our <a
                href={"https://github.com/colbymchenry/hydromade-template"} target={"_blank"}>Hydrogen
                Template.</a></small>
            <div className={styles.repos}>
                {!repos ? <FontAwesomeIcon icon={faSpinner} className={styles.spinner}/> : renderRepos()}
            </div>
            <div className={`d-flex w-100 justify-content-center align-items-center mt-3`}>
                <ButtonSubmit label={"Create"} type={"button"} disabled={!name || !selectedRepo}
                              processing={processing} onClick={submitTheme}/>
            </div>
        </animated.div>
        </>
    )
}