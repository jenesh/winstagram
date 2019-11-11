document.addEventListener("DOMContentLoaded", async () => {
    // let qoute = document.querySelector("#pTag");
    // let profilePic = document.querySelector("#profilePic");
    // profilePic.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQW5D4zzAKp63ffLqMVO_OG6dzc-aADUymr0Pmg5QdqZU3x9UJ9')";
    setInterval(() => {
        const timeTag = document.querySelectorAll('.time');
        console.log(timeTag);
        timeTag.forEach(ele => {
            let time = ele.innerText.split(' ')[0]
            let unit = ele.innerText.split(' ')[1]
            if (time < 60 ) {
                if (unit === 'mins') {
                    time = Number(time) + 1;
                    ele.innerText = `${time} mins ago`
                } else if (unit === 'hours') {
                    time = Number(time) + (1 / 24);
                    ele.innerText = `${time} hours ago`
                }
            } else if (time >= 60 && time < 1440) {
                ele.innerText = `${Math.floor(time / 60)} hours ago`
            }
            console.log(time);
        })
    }, 5000)
});