const postFetchObj = async (url, object, signal) =>
{
    const response = await fetch(url, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application-json",
            },
            body: JSON.stringify(object)
        })
    return await response.json()
}
export default postFetchObj