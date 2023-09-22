import { useEffect } from "react"
import postFetchObj from "../functions/postFetchObj"

const useCheckLogin = (url, callbackSuccess, callbackFailed, ab = new AbortController()) =>
{
    useEffect(() => {
        const ab = new AbortController();
      
        (async () => 
        {
          
          try {
            let token = localStorage.getItem('token');
            if (token === null) window.location = '/login';
            token = JSON.parse(token)
  
            console.log(token)
            const data = await postFetchObj(url, { token: token.token, perms: token.status }, ab.signal);
      
            if (data.status !== 'true') window.location = '/login';
            if (token.status === 'sell') window.location = '/venditore';

            if (typeof callbackSuccess === 'function') callbackSuccess()

          } catch (exception) { if (typeof callbackFailed === 'function') callbackFailed(exception) }

        })();
        
        return () => ab.abort();
      }, []);
}
export default useCheckLogin