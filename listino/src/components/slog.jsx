import React from "react"
import { useNavigate } from 'react-router-dom'

const Logout = ({prompt, className}) => 
{
    const navigate = useNavigate()

    return <button className={className} onClick={() => 
    {  
        localStorage.clear()
        navigate('/login')
    }}>
        {prompt || 'Logout'}
    </button>
}
export default Logout