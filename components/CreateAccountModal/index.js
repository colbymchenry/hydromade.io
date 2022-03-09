import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, animated } from 'react-spring';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import styles from './styles.module.css'
import { useState } from 'react'

export default function CreateAccountModal(props) {

    const [close, setClose] = useState(false);

    const comeIntoView = useSpring({
        from: { 
            top: "calc(-100vh)"
        },
        to: { 
            top: "0" 
        },
        delay: 500
    });

    const goOutOfView = useSpring({
        from: { 
            top: "0" 
        },
        to: { 
            top: "-100vh"
        },
        delay: 500
    });

    const fadeInUp = (delay) => useSpring({
        from: { 
            opacity: 0,
            marginTop: "10em"
        },
        to: { 
            opacity: 1,
            marginTop: "0"
        },
        delay
    });

    console.log(close)

    return (
        <animated.div style={close ? goOutOfView : comeIntoView} className={styles.container}>
            <button type="button" onClick={() => {
                setClose(true);
                props.close();
                // setTimeout(props.close(), 800);
            }}><FontAwesomeIcon icon={faX} /></button>
            <div>
                <animated.div style={fadeInUp(1000)} className={`w-100 ${styles.margin1}`}>
                    <input type="email" placeholder="me@example.com" />
                    <div className={styles.label}><small>Email</small></div>
                </animated.div>
                <animated.div style={fadeInUp(1200)} className={`w-100 ${styles.margin2}`}>
                    <input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                    <div className={styles.label}><small>Password (at least 8 characters)</small></div>
                </animated.div>
                <animated.div style={fadeInUp(1500)} className={`w-100 ${styles.margin3}`}>
                    <input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                    <div className={styles.label}><small>Password Confirmation</small></div>
                </animated.div>

                <animated.div style={fadeInUp(1800)} className={`w-100 d-flex justify-content-center ${styles.margin4}`}>
                    <ButtonSubmit label="Create Account" processing={false} />                
                </animated.div>
            </div>
        </animated.div>
    )

}