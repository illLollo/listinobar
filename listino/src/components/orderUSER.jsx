import React from "react"
import styles from '../css/menu.module.css'
import { motion } from 'framer-motion'

const OrderUSER = ({details, subtot, iterator}) => 
{
    console.log(details)
    return <motion.section 
                className={styles.orderContainer}
                initial={{y: '-50vh', opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={ {delay: 1 + (iterator / 15)} }
            >
        {
            details?.map(element => 
            <p>
                ${element.price} di {(+element.amount)}x {element.name}
            </p>
        )
        }
    </motion.section>
}
export default OrderUSER