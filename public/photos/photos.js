document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded')
})

const fetchPhotoAlbums = async (userId) => {
    const photoAlbum = await axios.get(`http://localhost:8000/albums/${userId}`)
    const 
    console.log(photoAlbum.data.message)
}

fetchPhotoAlbums(1)
