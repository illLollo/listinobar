import React, { useEffect, useState } from "react";
import postFetchNoBody from "../functions/postFetchNoBody";
import AdminProd from './adminProd'
import useCheckLogin from "../hooks/useLoginSELL";
import styles from '../css/dashboard.module.css'
import Logout from "./slog";
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import ProductModifier from "./productModifier";

const Dashboard = () =>
{
    const [prods, setProds] = useState([])

    const ab = new AbortController()

    useCheckLogin('http://167.235.9.22/listinophp/login/logToken.php',
    async () => 
    {
        const res = await postFetchNoBody('http://167.235.9.22/listinophp/menu/getProducts.php', ab.signal)

        console.log(res)
  
        setProds(res);
    },
    () => window.location = '/login', ab)


    const [navHidden, setNavHidden] = useState(false)
    const { scrollY } = useScroll()

    const [showModifier, setShowModifier] = useState({show: false})

    useEffect(() => console.log("SHOWMOD:", showModifier), [showModifier])

    useMotionValueEvent(scrollY, 'change', (latestValue) => setNavHidden(latestValue > scrollY.getPrevious() && latestValue > 200))

    return (
        <div className={styles.app + ' App'}>
            <motion.nav 
                className={styles.nav}
                variants={
                {
                    visible: {y: 0},
                    hidden: {y: '-100%'}
                }}
                animate={navHidden ? 'hidden' : 'visible'}
            >
                <img className={styles.img} src="https://cdn.discordapp.com/attachments/770905457652269076/1150427205634105414/Levi-Ponti-removebg-preview.png" alt="" onClick={() => window.location.reload() }/>
                <h1 className={styles.h1}>Dashboard BAR</h1>
                <button
                    className={styles.add}
                    onClick={() => window.location = '/venditore/dashboard/add'}
                    >
                    Aggiungi Un Prodotto
                </button>
                <Logout prompt={'Esci'} className={styles.logout}/>
            </motion.nav>

            {
                showModifier.show && 
                <ProductModifier 
                    modprops={showModifier}
                    handleProps={setShowModifier}
                />
            }
            
            {prods.length === 0 ? <h1>Nessun Prodotto!</h1> : 
                <div className={styles.maincontainer}>
                    <motion.h1
                        initial={{y: '-100vh', opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                    >
                        Prodotti
                    </motion.h1>
                    {prods.map((product, i) => <AdminProd key={product.productid} iterator={i} productid={product.productid} name={product.name} cost={product.cost} setProdModifier={setShowModifier}/> )}
                </div> 
            }
            <motion.button 
                className={styles.buttons}
                onClick={() => window.location= '/venditore'}
                initial={{y: '100vh', opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{delay: 0.5 + (prods.length / 10)}}
            >
                Indietro
            </motion.button>
        </div>
    )
}
export default Dashboard