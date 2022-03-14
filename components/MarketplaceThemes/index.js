import styles from './styles.module.css'
import {faEdit, faPlus, faTrash, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
import {useEffect, useState} from "react";
import {NewThemeModal} from "./NewThemeModal";
import {useAuth} from "../../contexts/AuthContext";
import Skeleton from 'react-loading-skeleton'
import axios from "axios";
import Swal from "sweetalert2";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import {AuthLayout} from "../layouts/AuthLayout";
import StripeConnect from "../StripeConnect";
import GithubConnect from "../GithubConnect";

export default function MarketplaceThemes({ accountInfo, fetchAccountInfo }) {

    const { currentUser } = useAuth();
    const [themes, setThemes] = useState(undefined);
    const [creatingTheme, setCreatingTheme] = useState(false);
    const [deployingTheme, setDeployingTheme] = useState(undefined);

    const fetchThemes = async () => {
        try {
            const res = await axios.get(`/api/themes/fetch?uid=${currentUser.uid}`);
            setThemes(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (!themes) fetchThemes();
    }, [])

    const renderThemes = () => {
        return themes.map((theme) => {
            return (
                <div key={theme.id} className={`d-flex justify-content-between w-100 align-items-center ${styles.theme}`}>
                    <div className={styles.themeInfo}>
                        {theme.name}
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div className={'d-flex'}>
                        <ButtonSubmit type={"button"} label={"deploy"} processingLabel={"deploying"} processing={deployingTheme && deployingTheme.id === theme.id} onClick={() => deployTheme(theme)} className={`btn-black ${styles.deploy}`} style={{ marginRight: '24px' }} />
                        <button type={"button"} onClick={() => deleteTheme(theme.id)} className={styles.delete}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                </div>
            )
        })
    }

    if (creatingTheme && accountInfo.stripe_url) {
        return (
            <StripeConnect url={accountInfo.stripe_url} requirements={accountInfo.requirements} fetchAccountInfo={fetchAccountInfo} />
        )
    }

    if (creatingTheme && !accountInfo.user.github_access_token) {
        return (
            <GithubConnect fetchAccountInfo={fetchAccountInfo} />
        )
    }

    return (
        <>
        <div className={styles.themes}>
            <div className={styles.header}>
                <h4>Themes</h4>
                <button type={"button"} className={"btn-black"} onClick={() => setCreatingTheme(true)}>Create Theme <FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <div className={styles.body}>
                {!themes ? <Skeleton containerClassName={'w-100 p-4'} count={7} height={40} /> : renderThemes()}
            </div>
        </div>
        {creatingTheme && <NewThemeModal setCreatingTheme={setCreatingTheme} fetchThemes={fetchThemes} />}
        </>
    )

}