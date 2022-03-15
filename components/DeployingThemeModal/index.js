import styles from './styles.module.css'
import {useSpring, animated} from "react-spring";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../contexts/AuthContext";
import FontAwesomeIcon from "../FontAwesomeIcon";
import {faLock, faSpinner, faTimes} from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Swal from "sweetalert2";

export function DeployingThemeModal(props) {

    const totalTime = 90;
    const [closing, setClosing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const { currentUser } = useAuth();

    const comeFromAbove = (delay) => useSpring({
        from: {
            marginTop: '-100vh'
        },
        to: {
            marginTop: '0vh'
        },
        delay
    });

    const goAwayAbove = (delay) => useSpring({
        to: {
            marginTop: '-100vh'
        },
        from: {
            marginTop: '0vh'
        },
        delay
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(seconds => {
                if (seconds >= totalTime) {
                    setCompleted(true);
                    props.setDeploying(false);
                    clearInterval(interval);
                }
                return seconds + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const renderCircles = (amount) => {
        var div = 360 / amount;
        var radius = 150;
        var parentdiv = document.getElementById('parentdiv');

        if (!parentdiv) return <></>

        var offsetToParentCenter = parseInt(parentdiv.offsetWidth / 2); //assumes parent is square
        var offsetToChildCenter = 20;
        var totalOffset = offsetToParentCenter - offsetToChildCenter;

        const divArray = [];

        for (var i = 1; i <= amount; ++i) {
            var y = Math.sin((div * i) * (Math.PI / 180)) * radius;
            var x = Math.cos((div * i) * (Math.PI / 180)) * radius;
            var inProgress = i <= (amount * (progress / totalTime));

            divArray.push(<div className={styles.div2 + " " + (inProgress ? styles.fill : '')} style={{ position: 'absolute', top: (y + totalOffset).toString() + "px", left: (x + totalOffset).toString() + "px", width: (amount / 2) + "px", height: (amount / 2) + "px"}}></div>)
        }

        return divArray;
    }

    const progressNumb = Math.round((progress / totalTime) * 100);

    return (
        <>
        <div className={`overlay`}></div>
        <animated.div style={closing ? goAwayAbove(200) : comeFromAbove(200)} className={styles.newThemeModel}>
            <div className={`d-flex w-100 justify-content-center`}><h1>Deploying...</h1></div>
            <div id="parentdiv" className={styles.div1}>{renderCircles(39)}</div>
            <div className={styles.progress}>
                <h1>{progressNumb > 100 ? 100 : progressNumb}%</h1>
            </div>
        </animated.div>
        </>
    )
}