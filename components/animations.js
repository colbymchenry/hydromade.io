import { useSpring, animated } from 'react-spring'

export const FadeAnimation = (delay) => useSpring({
    from: { 
        opacity: 0 
    },
    to: { 
        opacity: 1 
    },
    delay
});

export const SlideFromRight = (delay, finalMargin) => useSpring({
    from: { 
        marginLeft: "calc(200vw)"
    },
    to: { 
        marginLeft: finalMargin || "0em" 
    },
    delay
});

export const SlideAwayFromRight = (delay, startMargin) => useSpring({
    from: { 
        marginLeft: startMargin || "0em" 
    },
    to: { 
        marginLeft: "calc(200vw)"
    },
    delay
});

export const SlideFromLeft = (delay) => useSpring({
    from: { 
        marginRight: "calc(200vw)"
    },
    to: { 
        marginRight: "0em" 
    },
    delay
});

export const SlideAwayFromLeft = (delay, startMargin) => useSpring({
    from: { 
        marginRight: startMargin || "0em" 
    },
    to: { 
        marginRight: "calc(200vw)"
    },
    delay
});

export const SlideFromTop = (delay) => useSpring({
    from: { 
        marginBottom: "calc(90vh)"
    },
    to: { 
        marginBottom: "0em" 
    },
    delay
});

export const SlideFromButtom = (delay) => useSpring({
    from: { 
        marginTop: "calc(90vh)"
    },
    to: { 
        marginTop: "0em" 
    },
    delay
});