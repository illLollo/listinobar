import React from "react";
import { useState } from "react"
import styles from '../css/menu.module.css'
import { motion } from 'framer-motion'

const Product = ({name, cost, onAmountChange, iterator}) =>
{
    const [amount, setAmount] = useState(0);
  
    return (
      <motion.section 
          className={styles.mainSection}
          initial={{y: '-50vh', opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={ {delay: 0.5 + (iterator / 15)} }
      >
        <div className={styles.product_container}>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>${cost}</p>
          <p className={styles.amount}>Quantità: {amount}</p>
          <p className={styles.partial}>Totale parziale: ${(amount * cost).toFixed(2)}</p>
          <div className={styles.buttonContainer}>
            <button className={styles.buttons} onClick={() => {
              if (amount < 30) {
                setAmount((prev) => prev + 1);
                onAmountChange((+cost), {name: name, amount: (amount + 1).toFixed(2), price: ((amount + 1) * cost).toFixed(2)})
              }
      
            }}>+</button>
            <button className={styles.buttons} onClick={() => {
              if (amount > 0) {
                setAmount((prev) => prev - 1)
                onAmountChange(-(+cost), {name: name, amount: (amount - 1).toFixed(2), price: ((amount - 1) * cost).toFixed(2)})
              }
              
            }}>-</button>
          </div>
        </div>
      </motion.section>
    )
  
  
  }
export default Product