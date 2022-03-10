import React from 'react'

import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated, useSpring } from 'react-spring';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react'
import { toggleFullscreenScroll } from '../../utils/modal-utils';
import { FadeInUp, FadeOutDown, GoOutOfView, ComeIntoView, DisplayNone } from '../animations';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { sendEmailVerification } from 'firebase/auth';
import Confetti from 'react-confetti'
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import styles from './styles.module.css'
import { useWindowSize } from './../hooks/WindowResizeHook';

export default function AuthModal(props) {

    const [width, height] = useWindowSize();
    const { login, signup } = useAuth();
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const router = useRouter();
    const [close, setClose] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [processing, setProcessing] = useState(false);

    toggleFullscreenScroll(false);

    const onSubmit = async (data) => {
        setProcessing(true);
        try {
            if (data.password.length < 9) {
                setError("password", {
                    type: "manual",
                    message: "Password does not contain at least 8 characters.",
                });
                setProcessing(false);
                return;
            }

            if (data.password !== data.password_confirmation) {
                setError("password_confirmation", {
                    type: "manual",
                    message: "Passwords do not match.",
                });
                setProcessing(false);
                return;
            }

            if (props.login) {
                await login(data['email'], data['password']);
            } else {
                const user = await signup(data['email'], data['password']);
                await sendEmailVerification(user.user);
            }

            setCompleted(true);
            // router.push('/dashboard/appointments')
        } catch(e) {
            console.error(e)
            console.log(e?.code)
            if (e?.code === 'auth/email-already-in-use') {
              setError("email", {
                type: "manual",
                message: "Email already in use.",
              });
            }
        }

        setProcessing(false);
    }

    return (
        <animated.div style={close ? GoOutOfView(completed ? 100 : 800, () => props.close()) : ComeIntoView()} className={styles.container}>
            {completed && <Confetti
                width={width}
                height={height}
                recycle={false}
            />}
            <button type="button" onClick={() => setClose(true)}><FontAwesomeIcon icon={faX} /></button>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <animated.div style={close || completed ? FadeOutDown(500) : FadeInUp(200)} className={`w-100 ${styles.margin1}`}>
                        <input {...register("email", { required: true })} type="email" placeholder="me@example.com" className={errors?.email ? styles.error : ''} />
                        <div className={styles.label}><small>Email</small>{errors?.email && <small className={styles.error_label}>{errors.email.message}</small>}</div>
                    </animated.div>
                    <animated.div style={close || completed ? FadeOutDown(400) : FadeInUp(300)} className={`w-100 ${styles.margin2}`}>
                        <input {...register("password", { required: true })} type="password" className={errors?.password ? styles.error : ''} placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                        <div className={styles.label}><small>Password (at least 8 characters)</small>{errors?.password && <small className={styles.error_label}>{errors.password.message}</small>}</div>
                    </animated.div>
                    <animated.div style={close || completed ? FadeOutDown(300) : FadeInUp(400)} className={`w-100 ${styles.margin3}`}>
                        <input {...register("password_confirmation", { required: true })} type="password" className={errors?.password_confirmation ? styles.error : ''} placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                        <div className={styles.label}><small>Password Confirmation</small>{errors?.password_confirmation && <small className={styles.error_label}>{errors.password_confirmation.message}</small>}</div>
                    </animated.div>
                    <animated.div style={close || completed ? FadeOutDown(200) : FadeInUp(500)} className={`w-100 d-flex justify-content-center ${styles.margin4}`}>
                        <ButtonSubmit label={props.login ? "Login" : "Create Account"} style={{ minWidth: '240px' }} processing={processing} />
                    </animated.div>
                </form>

                <animated.div style={completed ? FadeInUp(800) : useSpring({})} className={`w-100 flex-column align-items-center text-center ${!completed ? styles.display_none : 'd-flex'}`}>
                    <h3>Congratulations!</h3>
                    <h5>Please check your inbox for a verification email.</h5>
                </animated.div>
            </div>
        </animated.div>
    )

}