document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded");
    const usernameInput = document.querySelector("#usernameInput");
    const passwordInput = document.querySelector("#passwordInput");
    const submitButton = document.querySelector("#submitButton");
    const form = document.querySelector("#form");

    form.addEventListener("submit", () => {
        getUser();
    });

 });

 const getUser = async () => {
     //network req to server
     //server needs endpoint
    //check user username equal usrnameInput

    //u and p values in network request
    //post req check if user in db

    // then get all posts with get


    const usernameInput = document.querySelector("#usernameInput").value;
    const passwordInput = document.querySelector("#passwordInput").value;

    if(usernameInput != null && passwordInput != null) {
        const response = await axios.get(`http://localhost:8000/users/login/inputs/${usernameInput}/${passwordInput}`);
        
        let data = response.data.payload;
        if(data.length === 0) {
            console.log("Error. Username doesn't exist");
        } else {
            console.log(data);
        }
    } else {
        console.log("Error")
    }
 }

