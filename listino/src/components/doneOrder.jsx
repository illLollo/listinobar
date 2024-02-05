import React from "react"
import styles from '../css/venditore.module.css'
import { motion } from 'framer-motion'
const DoneOrder = ({details, ownername, subtot, iterator}) =>
{
    return (
        <motion.div 
            className={styles.doneorder}
            initial={{y: '-50vh', opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={ {delay: 0.5 + (iterator / 15)} }
        >
            <div className={styles.details}>
                {
                    JSON?.parse(details)?.map((product) => 
                        <div className={styles.prod}>
                            <p className={styles.infos}>{product.amount}x {product.name}</p>
                        </div>
                    )
                }
            </div>
            <p className={styles.infos}>
                Subtot: ${subtot}
            </p>
            <p className={styles.infos}>
                Classe: {ownername}
            </p>
        </motion.div>
    )
}
export default DoneOrder