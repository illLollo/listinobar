import React from "react";
import styles from '../css/status.module.css'
const Failed = ({prompt, callback}) => 
{
    setTimeout(async() => {
        window.location.reload()
    }, 3000);

    typeof callback === 'function' && callback()

    return (
        <section className={styles.fullscreen}>
        <div className={styles.main}>
            <video src="http://167.235.9.22/listinophp/img/not.mp4" muted autoPlay playsInline></video>
            <h1>{prompt || 'Ordine Non Inviato!'}</h1>
        </div>
    </section>
    )


}
export default Failed