//   Preloader
const preloader = document.getElementById('preloader');
const preloaderImage = document.querySelector('.preloader-image');
const preloaderText = document.querySelector('.preloader-text');

document.documentElement.addEventListener('load', init()) 
async function init() {
    document.body.classList.add('stop_scrolling');
    await sleep(4500);
    preloader.style.display = 'none';
    document.body.classList.remove('stop_scrolling');
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Hamburger Menu 
const hamburger = document.querySelector('nav ul.hamburger-lines');
const hamburgerItem = document.querySelector('nav ul.navigation-list');

hamburger.addEventListener('click', hamburgerSlider);
function hamburgerSlider() {
    if (hamburgerItem.style.left === '100%') {
        hamburgerItem.style.left = '0%';
        document.body.classList.add('stop_scrolling');
    } else {
        hamburgerItem.style.left = '100%';
        document.body.classList.remove('stop_scrolling');
    }
}