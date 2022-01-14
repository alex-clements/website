import React from 'react';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

export default function Tank(props) {
    const [positionX, setPositionX] = useState(10);
    const bottom = 10;
    const left = 10;

    useEffect(() => {
        setPositionX(props.tankX);
    }, [props.tankX]);

    const variants = {
        left : positionX,
        bottom: bottom,
    }

    return (
        <motion.div animate={variants} className="space-invaders-tank" transition={{type: "linear", duration: 0.1}}>

        </motion.div>
    )
}