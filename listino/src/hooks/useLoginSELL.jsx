import { useEffect } from "react"
import postFetchObj from "../functions/postFetchObj"

const useCheckLogin = (url, callbackSuccess, callbackFailed, ab = new AbortController()) =>
{
    useEffect(() => {
        (async () => 
        {
          
          try {
            let token = localStorage.getItem('token');
            if (token === null) window.location = '/login';
            token = JSON.parse(token)
  
            console.log(token)
            const data = await postFetchObj(url, { token: token.token, perms: token.status }, ab.signal);

            console.log(data)
      
            if (data.status !== 'true') window.location = '/login';
            if (token.status === 'buy') window.location = '/menu';

            if (typeof callbackSuccess === 'function') callbackSuccess()

          } catch (exception) { if (typeof callbackFailed === 'function') callbackFailed(exception) }

        })();
        
        return () => ab.abort();
      }, []);
}
export default useCheckLogin