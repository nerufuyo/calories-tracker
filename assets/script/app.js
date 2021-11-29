//   Preloader
const preloader = document.getElementById('preloader');
const preloaderImage = document.querySelector('.preloader-image');
const preloaderText = document.querySelector('.preloader-text');

document.documentElement.addEventListener('load', init()) 
async function init() {
    document.body.classList.add('stop_scrolling');
    await sleep(7000);
    preloader.style.display = 'none';
    document.body.classList.remove('stop_scrolling');
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};