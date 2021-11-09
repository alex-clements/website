export default function captureAnalytics(stringArg) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            "accepts":"application/json",
            'Content-Type': 'application/json' },
        body: JSON.stringify({ title: stringArg })
    };

    // fetch("/api", requestOptions)
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error("ERROR");
    //     } else {
    //         return response.json();
    //     }
    // })
    // .then((responseJson) => {
    //     console.log(responseJson)
    // })
    // .catch((error) => {
    //     console.log(error);
    // })

}