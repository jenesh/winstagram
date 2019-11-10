document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const submitButton = document.querySelector("#submitButton");
    
    submitButton.addEventListener("click", () => {
        // const usernameInput = document.querySelector("#username");
        // const passwordInput = document.querySelector("password");
        console.log(usernameInput.value());
        // if(usernameInput.value.length || passwordInput.value.length) {
            
        // }
    })
});