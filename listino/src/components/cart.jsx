import React from "react";
import postFetchObj from "../functions/postFetchObj";
import styles from '../css/menu.module.css'
import { motion } from 'framer-motion'

const handleSendOrder = async (finalOrder, totalAmount, handleShowCart, handleShowResponse) => {

    const ab = new AbortController()

    let session = localStorage.getItem('token')

    if (session === null) window.location = '/login'

    session = JSON.parse(session)

    const response = await postFetchObj('http://167.235.9.22/listinophp/login/sendOrder.php', 
    {
      details: JSON.stringify(JSON.stringify(finalOrder)),
      subtot: totalAmount.toFixed(2),
      loggedas: session.loggedas,
      uid: session.uid,
      date: new Date(),

    }, ab.signal)

    console.log(response)

    handleShowCart((prev) => !prev)
    handleShowResponse(response)

    return () => { ab.abort() }

}
const Cart = ({handleShowCart, handleShowResponse, orderObj, subtot}) => 
{
    return (
        <section className={styles.cart}>
          <motion.div 
            className={styles.main_cart_frame}
            initial={{y: '-100vh', opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: '-100vh', opacity: 0}}
          >
            <h1 className={styles.totaltext}>Totale Ordine </h1>
            <div className={styles.riepilogo_container}>
              <section className={styles.riepilogo_info}>
              {
                orderObj.map((product, i) => 
                {
                  return (
                    <div className={styles.parent_toSend}>
                      <div className={styles.toSend}>
                        <p>Prodotto: {product.name}</p>
                        <p>Qt.ta: {product.amount}</p>
                        <p>Tot: ${product.price}</p>
                      </div>
                      {
                        i < orderObj.length - 1 && <hr></hr>
                      }
                    </div>
                  )
                })
              }
              </section>
              <div className={styles.cart_button_container}>
                <button className={styles.buttons} onClick={() => handleSendOrder(orderObj, subtot, handleShowCart, handleShowResponse)}>Invia Ordine</button>
                <button className={styles.buttons} onClick={() => handleShowCart((prev) => !prev)}>Modifica Ordine</button>
              </div>
            </div>
            <p className={styles.subtot}>Subtot: ${subtot.toFixed(2)}</p>
          </motion.div>
        </section>
      )
}
export default Cart;