import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import Cart from './cart'
import Success from './success'
import Failed from './failed'
import Product from './products'
import Logout from './slog'
import postFetchNoBody from '../functions/postFetchNoBody'
import useCheckLogin from '../hooks/useLoginBUY'
import styles from '../css/menu.module.css'
import postFetchObj from '../functions/postFetchObj'
import OrderUSER from './orderUSER'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const Menu = (props) =>
{
  useCheckLogin('http://167.235.9.22/listinophp/login/logToken.php', null, 
  (err) => console.error(err))

  const [products, setProducts] = useState([])
  const [doingOrders, setDoingOrders] = useState([])
  const [doneOrders, setDoneOrders] = useState([])
  
  const [totalAmount, dispatchTotalAmount] = useReducer((state, action) => (+(state + action).toFixed(2)), 0);
  const [finalOrder, dispatchFinalOrder] = useReducer((state, action) => 
  {
    console.log(action)
    console.log(state)
    const index = state.findIndex((obj) => obj.name === action.name)

    console.log(index)

    if (index === -1) return [...state, action]

    if ((+action.amount) === 0) state.splice(index, 1)
    else state[index] = {...action}

    state.sort((left, right) => left.name.localeCompare(right.name))

    return state
  }, [])

  const fillPage = () => 
  {
    const ab = new AbortController()
  
    const uid = JSON.parse(localStorage.getItem('token')).uid
  
    Promise.all([ postFetchNoBody('http://167.235.9.22/listinophp/menu/getProducts.php', ab.signal), 
                postFetchObj('http://167.235.9.22/listinophp/menu/getUserDONE.php', uid, ab.signal),
                postFetchObj('http://167.235.9.22/listinophp/menu/getUserDOING.php', uid, ab.signal) 
      ])
      .then(([products, done, doing]) => {
  
        setProducts(products)
        setDoingOrders(doing)
        setDoneOrders(done)
  
      })
      .catch((err) => { window.location = '/login' })
  
    return () => { ab.abort() }

  }

  useEffect(fillPage, [])

  const [showCart, setShowCart] = useState(false)
  const [showFinal, setShowFinal] = useState({})

  const [navHidden, setNavHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latestValue) => setNavHidden(latestValue > scrollY.getPrevious() && latestValue > 200))

  return (
    <div className={styles.app + " App"}>
        <motion.nav 
          className={styles.nav}
          variants={
          {
            visible: {y: 0},
            hidden: {y: '-100%'}
          }}
          animate={navHidden ? 'hidden' : 'visible'}
        >
          <h1 className={styles.h1}>Ordinazione Prodotti BAR</h1>
          <img className={styles.img} src="https://cdn.discordapp.com/attachments/770905457652269076/1150427205634105414/Levi-Ponti-removebg-preview.png" alt="" onClick={() => window.location.reload()}/>

          <Logout className={styles.logout} prompt={'Esci'}/>

        </motion.nav>
        <div className={styles.prodcontainer}>
          {
            products.map((element, i) =>
              <Product
                key={element.productid}
                name={element.name}
                cost={element.cost}
                iterator={i}
                onAmountChange={(change, prodOrder) => 
                { 
                  dispatchTotalAmount(change)
                  dispatchFinalOrder(prodOrder)
                }}
              />

            )}
        </div>
        <section className={styles.mainordercontainer}>
          <div className={styles.doingcontainer}>
          {doingOrders.length > 0 && <h1>Ordini in preparazione</h1>}
            {
              doingOrders.map((element, i) => 
                
                <OrderUSER
                key={element.orderid}
                details={JSON.parse(element.details)}
                subtot={element.subtot}
                iterator={i}
                /> 
                )
              }
          </div>
          <div className={styles.doingcontainer}>
            {doneOrders.length > 0 && <h1>Ordini completati</h1>}
            {
              doneOrders.map((element, i) => 

                <OrderUSER
                key={element.orderid}
                details={JSON.parse(element.details)}
                subtot={element.subtot}
                iterator={i}
                /> 
                )
              }
          </div>

        </section>
        {/* {
          totalAmount !== 0 && 
          <div className={styles.bottom_container}>
          TOTALE: {totalAmount.toFixed(2)}
          <br></br>
          ORDER: {JSON.stringify(finalOrder)}
        </div>
        } */}
      {
        totalAmount !== 0 && 
        <motion.div 
          className={styles.bottom_container}
          initial={{y: '100vh', opacity: 0}}
          animate={{y: 0, opacity: 1}}
        >
          Subitototale: ${totalAmount.toFixed(2)}
          <button className={styles.buttons + ' ' + styles.cart_button} onClick={() => setShowCart((prev) => !prev)}>
            Mostra Carrello
          </button>
        </motion.div>
      }

      {showCart && <Cart handleShowCart={setShowCart} handleShowResponse={setShowFinal} orderObj={finalOrder} subtot={totalAmount}/>}

      {showFinal.status === 'true' && <Success/>}
      {showFinal.status === 'false' && <Failed/>}

    </div>
  );

}

export default Menu;