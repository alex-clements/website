import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import './osScreen.css';


export default function OSScreen(props) {
    const [topSpace, setTopSpace] = useState(true);
    const [topSpaceTimer, setTopSpaceTimer] = useState(0);

    /**
     * Triggered on component mount.
     * Sets the timer for moving the main block of text.
     */
    useEffect(() => {
        const interval = setInterval(() => {
          setTopSpaceTimer(topSpaceTimer => topSpaceTimer + 1);
          setTopSpace(topSpace => !topSpace);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    /**
     * Obejct with the initial animation props for the main block of text.
     */
    const initialProps = {
        top: "0px"
    }

    /**
     * @returns The animation props for the main block of text.
     */
    const animatedProps = () => {
        return ({
          top: topSpace ? "50px" : "0px"
        })
    }

    /**
     * Object containing the transition props for the main block of text.
     */
    const transitionProps = {
        duration: 0
    }

    return (
            <div onClick={props.onComplete} className="os-screen text-center container-fluid">
                <motion.div className="os-screen-text-box" transition={transitionProps} initial={initialProps} animate={animatedProps} >
                <h1 className="os-screen-text">ALEX OS</h1>
                </motion.div>
                <div className="os-screen-bottom-text-box text-center">
                  <p className="os-screen-bottom-text">click anywhere to continue...</p>
                </div>
            </div>
    )
}
