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
});

$('.dropdown-trigger').dropdown();

$('.like-btn').click( async (ele) => {
    console.dir(ele.target);
    const postId = ele.target.parentElement.parentElement.dataset.postid;
    console.log(postId);

    if (ele.target.innerText === 'favorite') {
        ele.target.innerText = 'favorite_border';
    } else {
        ele.target.innerText = 'favorite';
    }
});

$('.edit-button').click(async (event) => {
    
    const ele = await event.target
    const postId = ele.dataset.postid
    console.log(postId) 
    
    const patchPost = await axios.patch(`http://localhost:8000/posts/${postId}`,
    {
        
    })
})

$('.delete-button').click(async (event) => {
    // const ele = event.target
    // const postText = document.querySelector('.black')
   
    const ele = await event.target
    const postId = ele.dataset.postid
    const deletePost = await axios.delete(`http://localhost:8000/posts/${postId}`)

    console.log(postId)
    console.log(deletePost.data.message)

    removePost(postId)

})

const removePost = (idPost) =>{
    let postHolder = document.querySelector('#holder')
    let elem = document.getElementById(idPost)
    console.log(elem)

    postHolder.removeChild(elem)
}

const editPost = () => {
    let 
}