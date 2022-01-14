import React from 'react';
import { useEffect, useState } from 'react';
import {motion} from 'framer-motion';

export default function Missile(props) {
    const [missileX, setMissileX] = useState(props.position[0]);
    const [missileY, setMissileY] = useState(props.position[1]);

    useEffect(() => {
        setMissileX(props.position[0]);
        setMissileY(props.position[1]);
    }, [props.position]);

    const variants = {
        left: missileX,
        bottom: missileY
    }

    const initial = {
        left: missileX,
        bottom: 20
    }

    return (
        <motion.div className="space-invaders-missile" initial={initial} animate={variants} transition={{type: "linear", "duration": 0.1}}>

        </motion.div>
    )
}