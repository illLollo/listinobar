import { useEffect } from "react"
import postFetchObj from "../functions/postFetchObj"

const useCheckLogin = (url, callbackFailed, ab = new AbortController()) =>
{
    useEffect(() => {
        (async () => 
        {
          
          try 
          {
            let token = localStorage.getItem('token');
            if (token === null) return
            token = JSON.parse(token)
            
            const data = await postFetchObj(url, { token: token.token, perms: token.status }, ab.signal);

            console.log(data)
      
            if (data.status !== 'true') return
            if (token.status === 'buy') window.location = '/menu';
            if (token.status === 'sell') window.location = '/venditore'

          } catch (exception) { if (typeof callbackFailed === 'function') callbackFailed(exception) }

        })();
        
        return () => ab.abort();
      }, []);
}
export default useCheckLogin