$(document).ready(() => {
    console.log('Javascript connected');
    $('.sidenav').sidenav();

    // Login Page
    $('#login').click(async () => {
        console.log('login')
        // await axios.get(`http://localhost:8000/login`);
        window.location.href = `http://localhost:8000/login`
    });

    // Signin Page
    $('#signup').click(async () => {
        console.log('signup')
        window.location.href = `http://localhost:8000/signup`;
    });
});