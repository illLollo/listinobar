import React, { useState } from 'react'
import Error from './error'
import postFetchObj from '../functions/postFetchObj'
import useCheckLogin from '../hooks/useLoginLOG'
import styles from '../css/login.module.css'

const handleLoginFunction = async (e, username, password, setShowError) =>
{
    e.preventDefault()
    
    const ab = new AbortController()
    
    const response = await postFetchObj('http://167.235.9.22/listinophp/login/login.php', 
    {
        username: username,
        password: password,

    }, ab.signal)

    console.log(response)

    try {
        switch (response.status)
        {
            case 'sell': 
            {
                localStorage.setItem('token', JSON.stringify(response))
                window.location = '/venditore'
                break;
            }
            case 'buy':
            {
                localStorage.setItem('token', JSON.stringify(response))
                window.location = '/menu'
                break;
            }
            case 'server':
            {
                setShowError({status: true, prompt: 'Errore di connessione al server!'})
                console.log(response) //error handling
                break;
            } 
            case null: 
            {
                setShowError({status: true, prompt: 'Username e\\o password errati!'})
                console.log(response) //error handling
                break;
            }
            case 'fields':
            {
                setShowError({status: true, prompt: 'Riempi i campi!'})
                break;
            }
            default:
            {
                setShowError({status: true, prompt: 'Errore nella richiesta dei dati!'})
                console.error('error fetching') //error handling
                break;
            }
        }

    }
    catch (error) { alert(error) }
    
    
    return () => ab.abort()
}
const hideError = (setShowError) => 
{
    // setTimeout(() => {
        setShowError({status: false})
    // }, 500);
}
const Login = () => 
{
    useCheckLogin('http://167.235.9.22/listinophp/login/logToken.php', (err) => setShowError(true))

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState({status: false})

    return (
        <div className={styles.app + ' App'}>
            <nav className={styles.nav}>
            <img className={styles.img} src="https://cdn.discordapp.com/attachments/770905457652269076/1150427205634105414/Levi-Ponti-removebg-preview.png" alt="" onClick={() => window.location.reload()}/>
                I.T.I.S. Levi-Ponti Mirano
            </nav>
            <div className={styles.container}>
                <form method="POST" className={styles.form + ' login-form'}>
                <h1>Servizio BAR</h1>
                    <div className={styles.cont_div}>
                        <label className={styles.label}>Username: </label>
                        <input className={styles.input} type="text" name="username" placeholder="Inserisci l'username" onClick={() => hideError(setShowError)} onInput={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.cont_div}>
                        <label className={styles.label}>Password:</label>
                        <input className={styles.input} type="password" name="password" placeholder="Inserisci la password" onClick={() => hideError(setShowError)} onInput={async (e) => 
                            {
                                // const pw = await bcrypt.hash(e.target.value, 10)
                                setPassword(e.target.value)
                            } 
                            }
                            />
                    </div>
                    <input className={styles.submit} type="submit" value="Login" onClick={(e) => handleLoginFunction(e, username, password, setShowError)} />

                    {showError.status && <Error className={styles.errortext} prompt={showError.prompt}/>}
                </form>
            </div>
        </div>
    )
}

export default Login