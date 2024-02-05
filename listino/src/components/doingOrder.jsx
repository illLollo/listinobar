import React from "react"
import postFetchObj from "../functions/postFetchObj"
import styles from '../css/venditore.module.css'
import { motion } from 'framer-motion'

const handleConfirmOrder = async (orderid, setSuccessOrder) => 
{
    const ab = new AbortController()
    console.log(orderid)

    const response = await postFetchObj('http://server632.ddns.net/listinophp/login/completeOrder.php', orderid, ab.signal)

    console.log(response)

    setSuccessOrder(response)

}

const DoingOrder = ({details, ownername, subtot, orderid, handleShowStatus, iterator}) =>
{
    console.log(handleShowStatus)
    return (
        <motion.div 
            className={styles.doingorder}
            initial={{y: '-50vh', opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={ {delay: 0.5 + (iterator / 15)} }
        >
            <div className={styles.details}>
                {
                    JSON?.parse(details)?.map((element, index) =>
                        <div className={styles.prod} key={index}>
                            <p className={styles.infos}>
                                {element.amount}x {element.name}
                            </p>
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
            <button 
                className={styles.buttons}
                onClick={(() => handleConfirmOrder(orderid, handleShowStatus))}
            >
                Completa
            </button>

        </motion.div>
    )
}
export default DoingOrder