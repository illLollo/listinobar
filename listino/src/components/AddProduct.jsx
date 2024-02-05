import React, { useEffect, useState } from "react"
import postFetchObj from "../functions/postFetchObj"
import Success from "./success"
import Failed from "./failed"
import useCheckLogin from "../hooks/useLoginSELL"
import styles from '../css/dashboard.module.css'
import Logout from "./slog"
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const validateInputs = (name, cost) => 
{    
    if (isNaN(+cost)) return false
    if (name.trim().length === 0 || cost.trim().length === 0) return false
    
    return true
}
const handleAddProduct = async (prodName, prodCost, setFetchStatus) => 
{
    try
    {
        setFetchStatus({show: await postFetchObj('http://server632.ddns.net/listinophp/settings/add/addNewProd.php', {name: prodName, cost: prodCost}) ? 'success' : 'failed'})
    }
    catch (exception) { setFetchStatus({show: 'failed'})}
}
const AddProduct = () =>
{
    const navigate = useNavigate()

    useCheckLogin('http://server632.ddns.net/listinophp/login/logToken.php', null, 

    (err) =>  navigate('/login'))
    

    const [sendable, setSendable] = useState(false)
    const [prodName, setProdName] = useState('')
    const [prodCost, setProdCost] = useState('')
    const [fetchStatus, setFetchStatus] = useState({show: null})


    useEffect(() =>
    {
        setSendable(validateInputs(prodName, prodCost))

    }, [prodName, prodCost])

    const [navHidden, setNavHidden] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latestValue) => setNavHidden(latestValue > scrollY.getPrevious() && latestValue > 200))

    return (
        <div className="App">
            <motion.nav 
                className={styles.nav}
                variants={
                {
                    visible: {y: 0},
                    hidden: {y: '-100%'}
                }}
                animate={navHidden ? 'hidden' : 'visible'}
            >
                <img className={styles.img} src="https://cdn.discordapp.com/attachments/770905457652269076/1150427205634105414/Levi-Ponti-removebg-preview.png" alt="" onClick={() => window.location.reload()}/>
                <h1 className={styles.h1}>Aggiungi Prodotto</h1>
                <button
                    className={styles.buttons}
                    onClick={() => navigate('/venditore/dashboard')}
                >
                    Indietro
                </button>
                <Logout className={styles.buttons}/>
            </motion.nav>
            <div className={styles.inputscontainer}>
                <motion.input
                    initial={{y: '-50vh', opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={ {delay: 0.2, ease: 'easeInOut'} }
                    type="text"
                    className={styles.input}
                    placeholder="Inserisci Nome Prodotto"
                    onInput={(e) => setProdName(e.target.value)}
                />
                <motion.input 
                    initial={{y: '-50vh', opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={ {delay: 0.3, ease: 'easeInOut'} }
                    type="text" 
                    className={styles.input}
                    placeholder="Inserisci Costo Prodotto"
                    onInput={(e) => setProdCost(e.target.value)}
                />

            </div>
            <div className={styles.buttoncontainer}>
                <motion.button
                    initial={{y: '-50vh', opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={ {delay: 0.4, ease: 'easeInOut'} }
                    disabled={!sendable}
                    className={styles.send}
                    onClick={(e) => handleAddProduct(prodName, prodCost, setFetchStatus)}
                >
                    Aggiungi Il Prodotto!
                </motion.button>
            </div>
            {fetchStatus.show === 'success' && <Success prompt={'Prodotto Aggiunto Con Successo!'}/>}
            {fetchStatus.show === 'failed' && <Failed prompt={'Prodotto Non Aggiunto!'}/>}
        </div>
    )
}

export default AddProduct