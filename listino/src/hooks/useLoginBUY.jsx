import { useEffect } from "react"
import postFetchObj from "../functions/postFetchObj"
import { useNavigate } from 'react-router-dom'

const useCheckLogin = (url, callbackSuccess, callbackFailed, ab = new AbortController()) =>
{
  const navigate = useNavigate()

    useEffect(() => {
        const ab = new AbortController();
      
        (async () => 
        {
          
          try {
            let token = localStorage.getItem('token');
            if (token === null) 
              navigate('/login')
            token = JSON.parse(token)
  
            console.log(token)
            const data = await postFetchObj(url, { token: token.token, perms: token.status }, ab?.signal);
      
            if (data.status !== 'true') 
              navigate('/login')
            if (token.status === 'sell') 
              navigate('/venditore')

            if (typeof callbackSuccess === 'function') callbackSuccess()

          } catch (exception) { if (typeof callbackFailed === 'function') callbackFailed(exception) }

        })();
        
        return () => ab.abort();
      }, []);
}
export default useCheckLogin