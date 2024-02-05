import React from "react"
import styles from '../css/dashboard.module.css'
import { motion } from 'framer-motion'
import { useState, useEffect } from "react"
import postFetchObj from "../functions/postFetchObj"
import Success from "./success"
import Failed from "./failed"

const validateInputs = (oldname, oldcost, name, cost) => 
{
    // console.table({oldname: oldname, oldcost: oldcost, name: name, cost: cost})
    
    if (isNaN(+cost)) return false
    if (name.trim().length === 0 || cost.trim().length === 0) return false
    if (oldname === name && oldcost === cost) return false
    
    return true
}
const handleModify = async (e, sendable, {newName, newCost, productid}, setError) => 
{      
    if (!sendable) 
    {
        e.stopPropagation()
        return
    }
    
    try
    {
        const response = await postFetchObj('http://server632.ddns.net/listinophp/settings/modify/modifyProd.php', {name: newName, cost: newCost, productid: productid})
        setError({showModified: response ? 'true' : 'false'})
    }
    catch (exception) { setError({showModified: 'false'})}

}

const ProductModifier = ({modprops, handleProps}) =>
{
    const [canMod, setCanMod] = useState(false)
    const [newName, setNewName] = useState(modprops.name)
    const [newCost, setNewCost] = useState(modprops.cost)    

    const [showModified, setShowModified] = useState({showModified: null})
    
    useEffect(() => 
    {
        setCanMod(validateInputs(modprops.name, modprops.cost, newName, newCost))

    }, [modprops.cost, modprops.name, newName, newCost])
    
    return (
        <motion.div>
            {showModified.showModified === 'true' && <Success prompt={'Ordine Modificato Con Successo'}/>}
            {showModified.showModified === 'false' && <Failed prompt={'Ordine Non Modificato'}/>}
            {showModified.showModified == null && 
                <motion.div 
                    className={styles.modifiercontainer}
                    variants={{
                        visible: {display: 'flex'},
                        hidden: {display: 'none'},
                    }}
                    animate={modprops.show ? 'visible' : 'hidden'}
                >
                    <motion.div 
                        className={styles.mainmodcontainer}
                        initial={{y: '-100vh', opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: '-100vh'}}
                        // transition={{duration: 0.3}}
                    >
                        <h1>Modifica Prodotto</h1>
                        <div className={styles.inputscontainer}>
                            <input 
                                type="text" 
                                defaultValue={modprops.name}
                                onInput={(e) => setNewName(e.target.value)}
                                className={styles.input}
                                >
                            </input>
                            <input
                                type="text"
                                defaultValue={modprops.cost}
                                onInput={(e) => setNewCost(e.target.value)}
                                className={styles.input}
                                >
                            </input>
                        </div>
                        <div className={styles.modbuttonscontainer}>
                            <button 
                                disabled={!canMod}
                                onClick={(e) => {
                                    handleModify(e, canMod, {newName, newCost, productid: modprops.productid}, setShowModified)
                                }}
                                className={styles.buttons}
                            >
                                Modifica
                            </button>
                            <button className={styles.buttons} onClick={() => handleProps((prev) => {
                                console.log(prev)
                                // modprops.show = !modprops.show onyl for animation
                                return {show: false}
                            })}>
                                Indietro
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            }
        </motion.div>
    )
}
export default ProductModifier