import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated } from 'react-spring';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { toggleFullscreenScroll } from '../../utils/modal-utils';
import { FadeInUp, FadeOutDown, GoOutOfView, ComeIntoView } from '../animations';

export default function CreateAccountModal(props) {

    const [close, setClose] = useState(false);

    useEffect(() => {
        toggleFullscreenScroll(false)
    }, [])

    return (
        <animated.div style={close ? GoOutOfView(1400, () => props.close()) : ComeIntoView()} className={styles.container}>
            <button type="button" onClick={() => setClose(true)}><FontAwesomeIcon icon={faX} /></button>
            <div>
                <animated.div style={close ? FadeOutDown(1100) : FadeInUp(1000)} className={`w-100 ${styles.margin1}`}>
                    <input type="email" placeholder="me@example.com" />
                    <div className={styles.label}><small>Email</small></div>
                </animated.div>
                <animated.div style={close ? FadeOutDown(800) : FadeInUp(1200)} className={`w-100 ${styles.margin2}`}>
                    <input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                    <div className={styles.label}><small>Password (at least 8 characters)</small></div>
                </animated.div>
                <animated.div style={close ? FadeOutDown(500) : FadeInUp(1500)} className={`w-100 ${styles.margin3}`}>
                    <input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                    <div className={styles.label}><small>Password Confirmation</small></div>
                </animated.div>

                <animated.div style={close ? FadeOutDown(200) : FadeInUp(1800)} className={`w-100 d-flex justify-content-center ${styles.margin4}`}>
                    <ButtonSubmit label="Create Account" processing={false} />
                </animated.div>
            </div>
        </animated.div>
    )

}