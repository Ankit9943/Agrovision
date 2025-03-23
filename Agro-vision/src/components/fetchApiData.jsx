async function fetchApiData(endpoint, mode="GET", event=null, body=null){
    if(event){
        event.preventDefault(); // preventing form from submitting 
    }
    try{
        const response =  await fetch(endpoint, {
            method: mode,
            headers: {
                'Content-Type': 'application/json',
            },
            body: mode === 'GET' ? null : JSON.stringify(body)
        });

        if(response.ok){
            const result = await response.json(); 
            console.log(result);
            return result; 
        }

    }catch(e){
        console.error(e);
        throw new Error(e.message);
    }

    return -1 
}