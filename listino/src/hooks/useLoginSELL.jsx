import { useEffect } from "react"
import postFetchObj from "../functions/postFetchObj"
import { useNavigate } from 'react-router-dom'

const useCheckLogin = (url, callbackSuccess, callbackFailed, ab = new AbortController()) =>
{
  const navigate = useNavigate()
    useEffect(() => {
        (async () => 
        {
          
          try {
            let token = localStorage.getItem('token');
            if (token === null) 
              navigate('/login')
            token = JSON.parse(token)
  
            console.log(token)
            const data = await postFetchObj(url, { token: token.token, perms: token.status }, ab?.signal);

            console.log(data)
      
            if (data.status !== 'true') 
              navigate('/login')
            if (token.status === 'buy') 
              navigate('/menu')

            if (typeof callbackSuccess === 'function') callbackSuccess()

          } catch (exception) { if (typeof callbackFailed === 'function') callbackFailed(exception) }

        })();
        
        return () => ab.abort();
      }, []);
}
export default useCheckLogin