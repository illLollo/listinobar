import React, { useState } from "react";
import DoingOrder from './doingOrder'
import DoneOrder from "./doneOrder"
import Logout from './slog'
import Error from './error'
import postFetchNoBody from "../functions/postFetchNoBody";
import useCheckLogin from "../hooks/useLoginSELL";
import styles from '../css/venditore.module.css'
import Success from './success'
import Failed from './failed'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useNavigate } from 'react-router-dom';


const Venditore = () => 
{
    const [doneOrders, setDoneOrders] = useState([])
    const [doingOrders, setDoingOrders] = useState([])

    const ab = new AbortController()

    const navigate = useNavigate()
    
    useCheckLogin('http://server632.ddns.net/listinophp/login/logToken.php', () => 
    {
        Promise.all(
            [
                postFetchNoBody('http://server632.ddns.net/listinophp/login/getDoingOrdersSELL.php', ab.signal),
                postFetchNoBody('http://server632.ddns.net/listinophp/login/getDoneOrdersSELL.php', ab.signal), 
            ])
            .then(([doingOrders, doneOrders]) => 
            {
                if (doingOrders === null || doneOrders === null) 
                {
                    setErr({show: true, prompt: 'Errore durante la richiesta degli ordini, riprova più tardi!'})
                    return
                }
                setDoingOrders(doingOrders)
                setDoneOrders(doneOrders)
                
            })
            .catch((err) => setErr({show: true, prompt: 'Errore durante la richiesta degli ordini, riprova più tardi!'}))
        },
        () => navigate('/login'), ab)
        
        
        const [showErr, setErr] = useState({show: false})
        const [successOrder, setSuccessOrder] = useState({})
        
        const [navHidden, setNavHidden] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latestValue) => setNavHidden(latestValue > scrollY.getPrevious() && latestValue > 200))
    
    
    return (
        <div className="App"> 
        {showErr.show ? <Error/> : 
            <div>
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
                    <h1 className={styles.h1}>Ordini BAR</h1>
                    <div className={styles.header_button_container}>
                        <button className={styles.modbutton} onClick={() => navigate('/venditore/dashboard')}>
                            Modifica i Prodotti
                        </button>
                        <Logout className={styles.logout}/>
                    </div>
                </motion.nav>
                {/* <Link to={'/venditore/dashboard'}>
                    Modifica i Prodotti
                </Link> */}
                <section className={styles.maincontainer}>
                    {(doingOrders.length === 0 && doneOrders.length === 0) && <h1 className={styles.noorder}>Nessun Ordine</h1>}
                    {
                        doingOrders.length !== 0 && 
                        <div className={styles.doingcontainer}>
                            <h1>Ordini Da Preparare</h1>
                            {
                                doingOrders?.map((order, i) => <DoingOrder key={order.orderid} iterator={i} details={order.details} ownername={order.ownername} subtot={order.subtot} orderid={order.orderid} handleShowStatus={setSuccessOrder}/>)
                            }
                        </div>
                    }
                    {
                        doneOrders.length !== 0 && 
                        <div className={styles.donecontainer}>
                            <h1>Ordini Preparati</h1>
                            {
                                doneOrders?.map((order, i) => <DoneOrder key={order.orderid} iterator={i} details={order.details} ownername={order.ownername} subtot={order.subtot} orderid={order.orderid}/>)
                            }
                        </div>
                    }
                </section>
                {successOrder.success === 'true' && <Success prompt={'Ordine confermato con Successo!'}/>}
                {successOrder.success === 'false' && <Failed prompt={'Ordine Non confermato!'}/>}
            </div>
            }
        </div>

    )
}
export default Venditore