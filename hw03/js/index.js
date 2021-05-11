/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

// create event handler:
// const showImage = (ev) => {
//     const elem = ev.currentTarget;
//     console.log(elem.style.backgroundImage);

    // your job: set the .featured_image's backgroundImage to the
    // element that was just clicked.
// };


// attach event handler to all of the image tags 
// (after initScreen() has been invoked).

// first get all of the image elements from the DOM:


const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};

// const imageElements = document.querySelectorAll('.image');

let currentIndex = 0;

// for (const elem of imageElements) {
//     elem.onclick = showImage;
//     currentIndex += 1;
// };

// create event handler:
const showImage = (ev) => {
    const elem = ev.currentTarget;
    currentIndex = parseInt(elem.dataset.index);
    console.log("currentIndex:", currentIndex);
    // update .featured_image
    displayImage();
};

const showNext = (ev) => {
    currentIndex += 1;

    if (currentIndex >= images.length) {
        currentIndex = 0
    }

    console.log("currentIndex:", currentIndex);
    // update .featured_image
    displayImage();
};

const showPrev = (ev) => {
    currentIndex -= 1;

    if (currentIndex < 0) {
        currentIndex = images.length - 1
    }

    console.log("currentIndex:", currentIndex);
    // update .featured_image
    displayImage();
};

const displayImage = () => {
    const curr = images[currentIndex];
    document.querySelector('.featured_image').style.backgroundImage = `url('${curr}')`; 
}

// attach event handler to all of the image tags 
// (after initScreen() has been invoked).
const attachEvenHandlers = () => {
    const imageElements = document.querySelectorAll('.image');
    for (const elem of imageElements) {
        elem.onclick = showImage;
        // currentIndex += 1;
    };
    
    document.querySelector('.next').onclick = showNext;
    document.querySelector('.prev').onclick = showPrev;
    document.querySelector('.featured_image').onclick = showNext;
};


initScreen();
attachEvenHandlers();