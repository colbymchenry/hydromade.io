import styles from './styles.module.css'
import {useAuth} from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket, faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

export default function Navbar(props) {

    const router = useRouter();
    const { currentUser, logout } = useAuth();

    if (!currentUser) {
        router.push("/");
        return <div> </div>
    }

    return (
        <div className={styles.navbar}>

            <div className={styles.topContent}>

            </div>

            <div className={styles.bottomContent}>
                {currentUser.email}
                <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={logout} />
            </div>

        </div>
    )

}