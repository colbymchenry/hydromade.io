import styles from './styles.module.css'
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Fetching(props) {

    return (
        <div className={"d-flex flex-column " + styles.main}>
            <FontAwesomeIcon icon={faSpinner} />
        </div>
    )

}