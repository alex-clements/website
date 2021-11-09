export default function captureAnalytics(stringArg) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            "accepts":"application/json",
            'Content-Type': 'application/json'},
        mode: 'no-cors',
        body: JSON.stringify({ title: stringArg })
    };

    // fetch("https://ec2-35-166-10-180.us-west-2.compute.amazonaws.com:5000/api", requestOptions)
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
    //     //pass
    // })

}