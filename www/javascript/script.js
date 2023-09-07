
const KEY_CODES = {
    space: 32,
    leftArrow: 37,
    rightArrow: 39,
};
let allSlides = [];

window.addEventListener('load', manageStart);
window.addEventListener('hashchange', manageHash);
window.addEventListener('keyup', (e) => {
    if (e.keyCode === KEY_CODES.leftArrow) {
        changeSlide('previous');
    }
    if ([KEY_CODES.rightArrow, KEY_CODES.space].includes(e.keyCode)) {
        changeSlide('next');
    }
}, true);

function manageStart() {
    const url = new URL(document.location.href);

    allSlides = [...document.getElementsByTagName('section')];
    allSlides.forEach((slide, index) => slide.setAttribute('id', 'slide' + (index + 1)));

    setTimeout(() => {
        // Ensure the target is taken in count
        // document.location.href = url.toString();
        manageHash()
    }, 1);
}

function manageHash() {
    const url = new URL(document.location.href);

    // if (!document.getElementById(url.hash.slice(1))) {
    //     url.hash = '';
    // }

    if (url.hash === '') {
        url.hash = allSlides[0].id;
        document.location.href = url.toString();
    }
}

function changeSlide(command = 'next') {
    const url = new URL(document.location.href);

    url.hash = url.hash || 'slide1';

    const newHash = 'slide' + (parseInt(url.hash.replace(/[^\d]/g, ''), 10) + (
        command === 'previous' ? -1 : 1
    ));

    if (document.getElementById(newHash)) {
        url.hash = newHash;
        document.location.href = url.toString();
    }

}
