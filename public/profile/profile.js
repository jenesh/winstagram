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

$('.edit-button').click(async (event) => {
    // console.dir(ele.target)
    const ele = event.target
    console.log(ele)
    console.log(ele.dataset) 
    
    // const patchPost = await axios.patch(`${ele.dataset.postId}`,
    // {

    // })
})

$('.delete-button').click(async (event) => {
    const ele = event.target
    // const postText = document.querySelector('.black')
    console.log(ele)
    console.log(ele.dataset)

    // const deletePost = await axios.delete(`${ele.dataset.postId}`)

})
