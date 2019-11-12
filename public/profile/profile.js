$('#logOut').click( async () => {
    const data = await axios.get(`http://localhost:8000/logout`);
    if (data.data.status) {
        window.location.href = `http://localhost:8000/login`;
    }
});

$('#homepageBtn').click( async => {
    window.location.href = `http://localhost:8000/homepage`;
});

$('#photoBtn').click( async => {
    window.location.href = `http://localhost:8000/photo`;
})