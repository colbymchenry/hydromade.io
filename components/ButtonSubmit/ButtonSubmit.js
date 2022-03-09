import styles from './styles.module.css'

export default function ButtonSubmit(props) {
    return (
        <button type={props?.type ? props.type : "submit"} className={`d-flex justify-content-center align-items-center ${styles.buttonSubmit} ${props.processing ? styles.processing : ''}${props?.className ? ' ' + props.className : ''}`} disabled={props.disabled || props.processing}>
            <span>{props.processing ? "Processing" : props.label || "Submit"}</span>
            {props.processing &&
                <div className={`d-flex h-100 justify-content-center align-items-center`}>
                    <i className="fas fa-spinner"></i>
                </div>
            }
        </button>
    )
}