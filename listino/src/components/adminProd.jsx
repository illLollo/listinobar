import React, { useState } from "react"
import postFetchObj from "../functions/postFetchObj"
import Success from "./success"
import Failed from "./failed"
import styles from '../css/dashboard.module.css'
import { motion } from 'framer-motion'

const handleDelete = async (productid, setDeleter) =>
{
    try 
    {
        setDeleter({showCanceled: await postFetchObj('http://167.235.9.22/listinophp/settings/deleteProd.php', productid) ? 'success' : 'failed'})
    }
    catch (exception) { setDeleter({showCanceled: 'failed'}) }
}

const AdminProd = ({productid, name, cost, iterator, setProdModifier}) => 
{
    const [showChanges, setShowChanges] = useState({})

    return (
        <motion.section 
            className={styles.doingorder}
            initial={{y: '-50vh', opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={ {delay: 0.5 + (iterator / 15)} }
        >
            <div className={styles.prodcontainer}>
                <div className={styles.textcontainer}>
                    <p className={styles.infos}>{name}</p>
                    <p className={styles.infos}>${(+cost).toFixed(2)}</p>
                </div>
                <div className={styles.buttoncontainer}>
                    <button 
                        className={styles.buttons}
                        onClick={() => setProdModifier((prev) => {
                            return {show: !prev.show, name, productid, cost}
                        })}
                        >
                        Modifica
                    </button>
                    <button 
                        className={styles.buttons}
                        onClick={() => handleDelete(productid, setShowChanges)}
                        >
                        Elimina
                    </button>
                </div>

            </div>
                {showChanges.showCanceled === 'success' && <Success prompt={'Prodotto Cancellato Con Successo'}/>}
                {showChanges.showCanceled === 'failed' && <Failed prompt={'Prodotto Non Cancellato'}/>}
                {showChanges.showModified === 'success' && <Success prompt={'Prodotto Modificato Correttamente'}/> }
                {showChanges.showModified === 'failed'  && <Failed prompt={'Prodotto Non Modificato'}/>}

        </motion.section>
    )
}
export default AdminProd