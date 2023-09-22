import React from "react";
import styles from '../css/status.module.css'
import { motion } from 'framer-motion'
const Success = ({prompt, callback}) => 
{
    console.log(prompt)

    setTimeout(async() => {
        window.location.reload()
    }, 3000);

    typeof callback === 'function' && callback()

    return (
        <section className={styles.fullscreen}>
            <motion.div 
                className={styles.main}
                initial={{y: '-100vh', opacity: 0}}
                animate={{y: 0, opacity: 1}}
            >
                <video src="http://167.235.9.22/listinophp/img/verified.mp4" muted autoPlay playsInline></video>
                <h1 className={styles.h1}>{prompt || 'Ordine Inviato Con Successo!'}</h1>
            </motion.div>
        </section>
    )
}
export default Success