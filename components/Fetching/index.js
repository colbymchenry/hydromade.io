import styles from './styles.module.css'
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {spinner} from "../ButtonSubmit/ButtonSubmit";

export default function Fetching(props) {

    return (
        <div className={"d-flex flex-column " + styles.main}>
            {spinner}
        </div>
    )

}