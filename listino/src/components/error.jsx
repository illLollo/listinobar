import React from "react"
import { motion } from 'framer-motion'

const Error = ({prompt, className}) => 
{
    return (

        <motion.h1 
            className={"errortext " + (className || '')}
            animate={{ y: 0, opacity: 1, }}
            initial={{ y: -30, opacity: 0, }}
            transition={{ ease: 'easeInOut', duration: 0.05}}      
        >
            {prompt || 'Errore nella connessione al server, riprova più tardi!'}
        </motion.h1>
        
    )
}
export default Error