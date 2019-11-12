document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded')
})

const fetchPhotosByAlbum = async (albumId) => {
    const photoAlbum = await axios.get(`http://localhost:8000/pictures/albums/${albumId}`)
    const photos = photoAlbum.data.payload
    console.log(photos)
    displayPhotos(photos)
}

fetchPhotosByAlbum(2)

const displayPhotos = async (photos) => {
    const photoHolder = document.querySelector('#photo-holder')
    const createPicture = document.createElement('img')

    for (let i = 0; i < photos.length; i++){
        createPicture.src = photos[i].url_picture
        createPicture.height = '500'
        createPicture.width = '700'
        photoHolder.appendChild(createPicture)
    }
}