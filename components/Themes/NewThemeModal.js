import styles from './styles.module.css'
import {useSpring, animated} from "react-spring";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../contexts/AuthContext";
import FontAwesomeIcon from "../FontAwesomeIcon";
import {faLock, faSpinner, faTimes} from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

export function NewThemeModal(props) {

    const { currentUser } = useAuth();
    const [repos, setRepos] = useState(undefined);
    const [selectedRepo, setSelectedRepo] = useState(undefined);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [closing, setClosing] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({})

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

    useEffect(async () => {
        try {
            const res = await axios.get(`/api/github/repos?uid=${currentUser.uid}`);
            setRepos(res.data);
        } catch (err) {

        }
    }, []);

    const submitTheme = async () => {
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
            setTimeout(() => props.setCreatingTheme(false), 500);
        } catch (err) {
            console.error(err);
        }

        setProcessing(false);
    }

    const renderRepos = () => {
        return repos.map((repo) => {
            return (
                <div key={repo.repoId} onClick={() => !repo.private ? setSelectedRepo(repo) : []} className={styles.repo + ' ' + (repo.private ? styles.disabled : '') + ' ' + (selectedRepo && selectedRepo.repoId === repo.repoId ? styles.selected : '')}>
                    {repo.full_name}{repo.private && <FontAwesomeIcon icon={faLock} /> }
                </div>
            )
        })
    }

    console.log(errors)

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
            <div className={`d-flex justify-content-between w-100 mb-3 ${styles.inputs}`}>

                <div>
                    <label htmlFor={"name"}>Name:</label>
                    <input type={"text"} id={"name"} className={Object.keys(errors).includes('name') ? styles.error : ''} value={name} onChange={(e) => {
                        setName(e.target.value);
                        setErrors((errors) => {
                            delete errors['name']
                            return errors;
                        })
                    }}/>
                    <small>At least 6 characters.</small>
                </div>
                <div>
                    <label htmlFor={"price"}>Price:</label>
                    <input type={"number"} id={"price"} min={0} step={1} value={price} placeholder={"0.00"}
                           onChange={(e) => setPrice(e.target.value)}/>
                    <small><b>Free</b> leave blank.</small>
                </div>
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