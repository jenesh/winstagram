// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM content loaded')
// })

// const fetchPhotoAlbums = async (userId) => {
//     const photoAlbum = await axios.get(`http://localhost:8000/albums/${userId}`)
//     const photos = photoAlbum.data.message
//     console.log(photos)
// }

// fetchPhotoAlbums(1)

$('#profileBtn').click( async => {
    window.location.href = `http://localhost:8000/profile`;
})

$('#homepageBtn').click( async => {
    window.location.href = `http://localhost:8000/homepage`;
});

$('#logOut').click( async () => {
    const data = await axios.get(`http://localhost:8000/logout`);
    if (data.data.status) {
        window.location.href = `http://localhost:8000/login`;
    }
});


$(document).ready(function(){
    $('.carousel').carousel();
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
});

$('.carousel.carousel-slider').carousel({
    fullWidth: false
});