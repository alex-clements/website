export default function captureAnalytics(stringArg) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            "accepts":"application/json",
            'Content-Type': 'application/json'},
        body: JSON.stringify({ title: stringArg })
    };

    fetch("https://www.alexsapiserver.com/", requestOptions)
    .then(response => {
        if (!response.ok) {
            console.log("response not ok");
            throw new Error("ERROR");
        } else {
            return response.json();
        }
    })
    .then((responseJson) => {
        //console.log(responseJson)
    })
    .catch((error) => {
        //pass
    })

}