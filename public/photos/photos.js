document.addEventListener('DOMContentLoaded', () => {

})

const fetchPhotoAlbums = async (userId) => {
    const photoAlbum = await axios.get(`http://localhost:8000/albums/${userId}`)
    console.log(photoAlbum)
}

fetchPhotoAlbums()