document.addEventListener("DOMContentLoaded", async () => {
    timeFormat();
});

const timeFormat = () => {
    const timeTag = document.querySelectorAll('.time');
    // console.log(timeTag);
    timeTag.forEach(ele => {
        let time = ele.innerText.split(' ')[0]
        let unit = ele.innerText.split(' ')[1]
        if (time < 60 ) {
            time = Number(time);
            ele.innerText = `${time} mins ago`;
        } else if (time >= 60 && time < 1440) {
            ele.innerText = `${Math.floor(time / 60)} hours ago`;
        } else if (time >= 1440) {
            ele.innerText = `${Math.floor(time / (60 * 24))} days ago`;
        }
        // console.log(time);
    });
}

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


$('.like-btn').click( async (ele) => {
    let spanLikes = ele.target.nextElementSibling;
    likes = spanLikes.innerText;
    likes = likes.split(' ');

    if (ele.target.innerText === 'favorite') {
        ele.target.innerText = 'favorite_border';
        let likesNum = Number(likes[0]);
        likes[0] = likesNum - 1;
        likes = likes.join(' ');

        spanLikes.innerText = likes;
    } else {
        ele.target.innerText = 'favorite';
        let likesNum = Number(likes[0]);
        likes[0] = likesNum + 1;
        likes = likes.join(' ');

        spanLikes.innerText = likes;
    }
});

// $('.edits').click( async (ele) => {
//     console.dir(ele.target);
//     const postId = ele.target.parentElement.dataset.id;
//     console.log(postId);

//     // if (ele.target.innerText === 'favorite') {
//     //     ele.target.innerText = 'favorite_border';
//     // } else {
//     //     ele.target.innerText = 'favorite';
//     // }
// });

$('.edit-button').click(async (ele) => {
    const el = await ele.target.dataset.postid;
    console.log(el);
    
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

$('.dropdown-trigger').dropdown();

$(document).ready(function(){
    $('.materialboxed').materialbox();
});
