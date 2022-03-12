import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.css'

export default function ButtonSubmit(props) {
    return (
        <button type={props?.type ? props.type : "submit"} style={props.style} onClick={props.onClick} className={`d-flex justify-content-center align-items-center ${styles.buttonSubmit} ${props.processing ? styles.processing : ''}${props?.className ? ' ' + props.className : ''}`} disabled={props.disabled || props.processing}>
            <span className={`w-75`}>{props.processing ? props.processingLabel || "Processing" : props.label || "Submit"}</span>
            {props.processing &&
                <div className={`d-flex w-25 h-100 justify-content-center align-items-center`}>
                    <FontAwesomeIcon icon={faSpinner} />
                </div>
            }
            
        </button>
    )
}