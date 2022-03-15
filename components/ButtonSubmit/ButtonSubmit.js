import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.css'

export const spinner = <svg viewBox="0 0 24 24" className={styles.big}>
    <g transform="translate(1 1)" fill-rule="nonzero" fill="none">
        <circle cx="11" cy="11" r="11"></circle>
        <path
            d="M10.998 22a.846.846 0 0 1 0-1.692 9.308 9.308 0 0 0 0-18.616 9.286 9.286 0 0 0-7.205 3.416.846.846 0 1 1-1.31-1.072A10.978 10.978 0 0 1 10.998 0c6.075 0 11 4.925 11 11s-4.925 11-11 11z"
            fill="currentColor"></path>
    </g>
</svg>

export const rightArrow = <svg aria-hidden="true"
                                   className="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--arrowRight-svg Button-icon-svg Icon-color-svg Icon-color--white-svg"
                                   height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M12.583 7L7.992 2.409A1 1 0 1 1 9.407.993l6.3 6.3a1 1 0 0 1 0 1.414l-6.3 6.3a1 1 0 0 1-1.415-1.416L12.583 9H1a1 1 0 1 1 0-2z"
        fill-rule="evenodd"></path>
</svg>

export default function ButtonSubmit(props) {
    return (
        <button type={props?.type ? props.type : "submit"} style={props.style} onClick={props.onClick} className={`d-flex justify-content-center align-items-center ${styles.buttonSubmit} ${props.processing ? styles.processing : ''}${props?.className ? ' ' + props.className : ''}`} disabled={props.processing || props.disabled}>
            <span>{props.label}</span>
                <div className={`d-flex h-100 justify-content-center align-items-center ${props.processing ? styles.spin : ''}`}>
                    {props.processing ? spinner : rightArrow}
                </div>
        </button>
    )
}
