import styles from './styles.module.css'
import {faEdit, faPlus, faTrash, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
import {useEffect, useState} from "react";
import {NewThemeModal} from "./NewThemeModal";
import {useAuth} from "../../contexts/AuthContext";
import Skeleton from 'react-loading-skeleton'
import axios from "axios";
import Swal from "sweetalert2";

export default function Themes(props) {

    const { currentUser } = useAuth();
    const [themes, setThemes] = useState(undefined);
    const [creatingTheme, setCreatingTheme] = useState(false);

    const fetchThemes = async () => {
        try {
            const res = await axios.get(`/api/themes/fetch?uid=${currentUser.uid}`);
            setThemes(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const deployTheme = async (theme) => {

        await Swal.fire({
            html: `Use the '<b>${theme.name}</b>' theme?`,
            icon: "warning",
            confirmButtonText: "Deploy",
            denyButtonText: "Nevermind",
            confirmButtonColor: "#009ef7",
            denyButtonColor: "gray",
            showCloseButton: true,
            showDenyButton: true,
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post(`/api/stores/deploy?uid=${currentUser.uid}`, {
                        theme: theme.id
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    const deleteTheme = async (theme) => {
        await Swal.fire({
            title: "Are you sure?",
            text: "This can't be undone.",
            icon: "warning",
            confirmButtonText: "Delete",
            denyButtonText: "Nevermind",
            confirmButtonColor: "red",
            denyButtonColor: "gray",
            showCloseButton: true,
            showDenyButton: true,
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post(`/api/themes/delete?uid=${currentUser.uid}`, {
                        theme
                    });
                    await fetchThemes();
                } catch (err) {
                    console.error(err);
                }
            }
        });
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
                    <div>
                        <button type={"button"} onClick={() => deployTheme(theme)} className={`btn-black`} style={{ marginRight: '24px' }}>deploy</button>
                        <button type={"button"} onClick={() => deleteTheme(theme.id)} className={styles.delete}><FontAwesomeIcon icon={faTrashAlt} /></button>
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