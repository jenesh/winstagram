document.addEventListener("DOMContentLoaded", async () => {
    timeFormat();

    // setInterval(() => {
    //     const timeTag = document.querySelectorAll('.time');
    //     console.log(timeTag);
    //     timeTag.forEach(ele => {
    //         let time = ele.innerText.split(' ')[0]
    //         let unit = ele.innerText.split(' ')[1]
    //         if (time < 60 ) {
    //             if (unit === 'mins') {
    //                 time = Number(time) + 1;
    //                 ele.innerText = `${time} mins ago`
    //             } else if (unit === 'hours') {
    //                 time = Number(time) + (1 / 24);
    //                 ele.innerText = `${time} hours ago`
    //             }
    //         } else if (time >= 60 && time < 1440) {
    //             ele.innerText = `${Math.floor(time / 60)} hours ago`
    //         }
    //         // console.log(time);
    //     })
    // }, 60000);

    // Trying it different way not working :(
    // setInterval(() => {
    //     const timeTag = document.querySelectorAll('.time');
    //     console.log(timeTag);
    //     timeTag.forEach(ele => {
    //         let time = ele.innerText.split(' ')[0]
    //         let unit = ele.innerText.split(' ')[1]
    //         if (unit === 'mins' ) {
    //             if (time < 59) {
    //                 time = Number(time) + 1;
    //                 ele.innerText = `${time} mins ago`
    //             } else if (time >= 59) {
    //                 time = Number(time) + (1 /1440);
    //                 ele.innerText = `${time} hours ago`
    //             }
    //         } else if (unit === 'hours') {
    //             // time >= 60 && time < 1440
    //             if (time < 24) {
    //                 time = Number(time) + (1 /1440);
    //                 ele.innerText = `${Math.floor(time / 60)} hours ago`
    //             } else if (time >= 24) {
    //                 time = Number(time) + (1 /1440);
    //                 ele.innerText = `${Math.floor(time / 60)} days ago`
    //             }
    //         console.log(time);
    //         }
    //     })
    // }, 60000);
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

$('#profileBtn').click( async () => {
    window.location.href = `http://localhost:8000/profile`;
})

$('#photoBtn').click( async () => {
    window.location.href = `http://localhost:8000/photo`;
})

$('.dropdown-trigger').dropdown();

// $('.like-btn').click( async (ele) => {
//     console.dir(ele.target);
//     const postId = ele.target.parentElement.parentElement.dataset.postid;
//     console.log("postId:", postId);

//     if (ele.target.innerText === 'favorite') { //red
//         ele.target.innerText = 'favorite_border'; //white
//     } else {
//         ele.target.innerText = 'favorite'; //red
//     }
// });

$('.like-btn').click( async (ele) => {
    console.dir(ele.target);
    let spanLikes = ele.target.nextElementSibling;
    likes = spanLikes.innerText;
    likes = likes.split(' ');
    const postId = ele.target.id;
    const posterId = ele.target.dataset.userid;
    console.log("postId:", postId);
    console.log("posterId:", posterId);


    if (ele.target.innerText === 'favorite') { //red
        const deleteLike = await axios.delete(`http://localhost:8000/likes/like/${postId}`);
        console.log("deleteLike:", deleteLike);
        ele.target.innerText = 'favorite_border';
        let likesNum = Number(likes[0]);
        likes[0] = likesNum - 1;
        likes = likes.join(' ');
        spanLikes.innerText = likes;
    } else {
        const likePost = await axios.post(`http://localhost:8000/likes/posts/${postId}`, {poster_id: posterId});
        console.log("likePosts:", likePost);
        ele.target.innerText = 'favorite';
        let likesNum = Number(likes[0]);
        likes[0] = likesNum + 1;
        likes = likes.join(' ');
        spanLikes.innerText = likes;
    }
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
});
