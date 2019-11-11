$(document).ready(() => {
    console.log('Javascript connected');
    $('.sidenav').sidenav();

    // Login Page
    $('#login').click(async () => {
        console.log('login');
        // Send user to login page
        window.location.href = `http://localhost:8000/login`;
    });

    // Signin Page
    $('#signup').click(async () => {
        console.log('signup');
        // Send user to signup page
        window.location.href = `http://localhost:8000/signup`;
    });
});