const postFetchNoBody = async (url, signal) => 
{
    const response = await fetch(url, { method: 'POST', signal})
    return await response.json()
}
export default postFetchNoBody