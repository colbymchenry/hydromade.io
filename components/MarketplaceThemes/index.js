import styles from './styles.module.css'
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import Skeleton from 'react-loading-skeleton'
import axios from "axios";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import FontAwesomeIcon from "../FontAwesomeIcon";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";

export default function MarketplaceThemes() {

    const { currentUser } = useAuth();
    const [themes, setThemes] = useState(undefined);
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
                    </div>
                    <div className={'d-flex'}>
                        <ButtonSubmit type={"button"} label={<FontAwesomeIcon icon={faCartPlus} />} processingLabel={" "} processing={deployingTheme && deployingTheme.id === theme.id} onClick={() => deployTheme(theme)} className={`btn-black ${styles.deploy}`} style={{ marginRight: '24px' }} />
                    </div>
                </div>
            )
        })
    }

    return (
        <>
        <div className={styles.themes}>
            <div className={styles.header}>
                <h4>Public Themes</h4>
            </div>
            <div className={styles.body}>
                {!themes ? <Skeleton containerClassName={'w-100 p-4'} count={7} height={40} /> : renderThemes()}
            </div>
        </div>
        </>
    )

}