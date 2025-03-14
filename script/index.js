console.log('Index is connected');

// Button section
function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => {
        displayCategories(data.categories);
    })
}
function displayCategories(categories){
    const categoryContainer = document.getElementById('btn-container');
    for(const category of categories){
        const div = document.createElement('div');
        div.innerHTML = 
        `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
        categoryContainer.appendChild(div);
    }
}

// Video Section
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos));
}
const displayVideos = (videos) => {
    console.log(videos);
}

loadVideos();
loadCategories();