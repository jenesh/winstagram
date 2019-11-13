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