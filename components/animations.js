import React from 'react'

import { useSpring, animated } from 'react-spring'

export const ComeIntoView = () => useSpring({
    from: { 
        top: "calc(-100vh)"
    },
    to: { 
        top: "0" 
    }
});

export const GoOutOfView = (delay, onRest) => useSpring({
    from: { 
        top: "0" 
    },
    to: { 
        top: "-130vh"
    },
    onRest,
    delay
});

export const FadeInUp = (delay) => useSpring({
    from: { 
        opacity: 0,
        height: "0"
    },
    to: { 
        opacity: 1,
        height: "5em"
    },
    delay
});

export const FadeOutDown = (delay) => useSpring({
    to: { 
        opacity: 0,
        height: "0"
    },
    from: { 
        opacity: 1,
        height: "5em"
    },
    delay
});

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
