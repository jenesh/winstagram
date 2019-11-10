document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM content loaded");
    const usernameInput = document.querySelector("#usernameInput");
    const passwordInput = document.querySelector("#passwordInput");
    const submitButton = document.querySelector("#submitButton");
    const form = document.querySelector("#form");

    form.addEventListener("submit", async () => {
        await getUser();
    });
});

const getUser = async () => {
    const usernameInput = document.querySelector("#usernameInput").value;
    const passwordInput = document.querySelector("#passwordInput").value;

    if (usernameInput != null && passwordInput != null) {
        const data = await axios.get(`http://localhost:8000/users/login/inputs/${usernameInput}/${passwordInput}`);
        console.log("response:", data);

        if (data.success) {
            const username = data.data.payload.username;
            const id = data.payload.id;
            await axios.get(`http://localhost:8000/validation?username=${username}&id=${id}`);
            window.location = `/homepage`;
        } else {
            console.log('Try again');
        }
    }
}

