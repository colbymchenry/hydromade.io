import styles from './styles.module.css'
import {faEdit, faPlus, faTrash, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
import {useEffect, useState} from "react";
import {NewThemeModal} from "./NewThemeModal";
import {useAuth} from "../../contexts/AuthContext";
import Skeleton from 'react-loading-skeleton'
import axios from "axios";

export default function Themes(props) {

    const { currentUser } = useAuth();
    const [themes, setThemes] = useState(undefined);
    const [creatingTheme, setCreatingTheme] = useState(false);

    const fetchThemes = async () => {
        try {
            const res = await axios.get(`/api/themes/fetch?uid=${currentUser.uid}`);
            console.log(res.data);
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
                <div className={`d-flex justify-content-between w-100 align-items-center ${styles.theme}`}>
                    <div className={styles.themeInfo}>
                        {theme.name}
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div>
                        <button type={"button"} className={styles.delete}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                </div>
            )
        })
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