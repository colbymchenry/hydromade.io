import styles from './styles.module.css'
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
import {useState} from "react";
import {NewThemeModal} from "./NewThemeModal";

export default function Themes(props) {

    const [creatingTheme, setCreatingTheme] = useState(false);

    const fetchThemes = async () => {

    }

    return (
        <>
        <div className={styles.themes}>
            <div className={styles.header}>
                <h4>Themes</h4>
                <button type={"button"} className={"btn-black"} onClick={() => setCreatingTheme(true)}>Create Theme <FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <div className={styles.body}>

            </div>
        </div>
        {creatingTheme && <NewThemeModal setCreatingTheme={setCreatingTheme} fetchThemes={fetchThemes} />}
        </>
    )

}