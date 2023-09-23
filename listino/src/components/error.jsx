import React from "react"
import { motion } from 'framer-motion'

const Error = ({prompt, className}) => 
{
    return (
        <motion.h1 
            className={"errortext " + (className || '')}
            initial={{ y: '-10vh', opacity: 0, }}
            animate={{ y: 0, opacity: 1, }}
            exit={{y: '-10vh', opacity: 0}}   
            transition={{duration: 0.1, ease: 'linear'}}
        >
            {prompt || 'Errore nella connessione al server, riprova più tardi!'}
        </motion.h1>
        
    )
}
export default Error