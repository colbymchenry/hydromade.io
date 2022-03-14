import styles from './styles.module.css'

export default function StripeConnect(props) {

    return (
        <div className={"d-flex flex-column " + styles.main}>
            {props.requirements && props.requirements.includes("individual.verification.document") ?
                <h3>Your Stripe account requires documents for verification.</h3> :
                <h3>To upload a theme you must create a Stripe account.</h3>
            }
            <a href={props.url}>Application</a>
        </div>
    )

}