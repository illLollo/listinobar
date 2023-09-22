import React from "react"

const Logout = ({prompt, className}) => 
{
    return <button className={className} onClick={() => 
    {  
        localStorage.clear()
        window.location = '/login'
    }}>
        {prompt || 'Logout'}
    </button>
}
export default Logout