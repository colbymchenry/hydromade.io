import styles from './styles.module.css'

export default function StripeConnect(props) {

    return (
        <div className={"d-flex flex-column " + styles.main}>
            <h3>To upload a theme you must create a Stripe account.</h3>
            <a href={props.url}>Create Account</a>
        </div>
    )

}