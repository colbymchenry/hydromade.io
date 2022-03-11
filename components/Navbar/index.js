import styles from './styles.module.css'
import {useAuth} from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket, faDoorOpen, faHome, faStore} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import {faBuromobelexperte} from "@fortawesome/free-brands-svg-icons";

export default function Navbar(props) {

    const router = useRouter();
    const { currentUser, logout } = useAuth();

    if (!currentUser) {
        router.push("/");
        return <div> </div>
    }

    let email = currentUser.email.split("@")[0];

    if (email.length > 15) {
        email = email.substring(0, 15);
    }

    return (
        <div className={styles.navbar}>

            <div className={styles.topContent}>
                <NavItem icon={faHome} url={"/app"} label={"Dashboard"} router={router} />
                <NavItem icon={faStore} url={"/app/marketplace"} label={"Marketplace"} router={router} />
            </div>

            <div className={styles.bottomContent}>
                {email}
                <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={logout} />
            </div>

        </div>
    )

}

function NavItem({label, url, icon, router}) {
    return (
        <div className={styles.navItem + ' ' + (router.pathname === url ? styles.active : '')} onClick={() => router.push(url)}>
            <FontAwesomeIcon icon={icon} />
            <span>{label}</span>
        </div>
    )
}