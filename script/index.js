console.log('Index is connected');

function removeActiveClass(){
    const btns = document.getElementsByClassName("active");
    for (const btn of btns){
        btn.classList.remove('active');
    }
}

// Button section
function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => {
            displayCategories(data.categories);
        })
}
const loadCaregoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const clickedBtn = document.getElementById(`btn-${id}`);
        clickedBtn.classList.add('active');
        displayVideos(data.category)
    });
}
function displayCategories(categories) {
    const categoryContainer = document.getElementById('btn-container');
    for (const category of categories) {
        const div = document.createElement('div');
        div.innerHTML =
            `
        <button id="btn-${category.category_id}" onclick="loadCaregoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
        categoryContainer.appendChild(div);
    }
}

// Video Section
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => {
            document.getElementById('btn-all').classList.add('active');
            displayVideos(data.videos)
        });
}
const showDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video));
}
const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = 
        `
        <div class="card bg-base-100 image-full shadow-sm">
    <figure>
        <img
        src="${video.thumbnail}" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">Card Title</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div class="card-actions justify-end">
    </div>
    </div>
    `;
}
const displayVideos = (videos) => {
    const videoConatiner = document.getElementById('video-container');
    videoConatiner.innerHTML = "";
    if(videos.length == 0){
        videoConatiner.innerHTML =
        `
        <div class="flex flex-col justify-center items-center col-span-full py-20 gap-10">
                <img src="src/Icon.png" alt="">
                <h3 class="font-bold text-3xl">Oops!! Sorry, There is no content here</h3>
        </div>
        `
    }

    console.log(videos);
    videos.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML =
            `
            <div class="card bg-base-100 shadow-sm">
                <figure class="relative">
                    <img class="w-full h-[150px] object-cover"
                    src="${video.thumbnail}" />
                    <span class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2">3hrs 56 min ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                              <img src="${video.authors[0].profile_picture}" />
                            </div>
                          </div>
                    </div>
                    <div class="intro space-y-2">
                        <h2 class="text-base font-bold">Midnight Serenade
                        </h2>
                        <p class="text-sm text-gray-500 flex gap-1">
                        ${video.authors[0].profile_name} 
                         ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></p>` : ``} 
                        <p class="text-sm text-gray-500">${video.others.views}</p>
                    </div>
                </div>
                <button onclick="showDetails('${video.video_id}')" class="btn btn-block">Show details</button>
                </div>
        `;
        videoConatiner.appendChild(div);
    });
}

loadCategories();

// {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }