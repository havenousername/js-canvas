"use strict";

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function loadScript(callback, ...urls) {
    // Adding the script tag to the head as suggested before
    const head = document.head;
    const scripts = [];

    function load(url) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        return script;
    }

    for(let i = 0; i < urls.length; i++) {
        if (!urls[i].noLoad) {
            scripts.push(load(urls[i].src));
        }

    }

    if (!isFunction(callback) && callback.node) {
        for (let i = 0; i < scripts.length; i++) {
            head.appendChild(scripts[i]);
        }
        return;
    }

    Promise.all(scripts)
        .then(function (resolve) {
            for (let i = 0; i < resolve.length; i++) {
                head.appendChild(resolve[i]);
            }
            resolve[resolve.length - 1].onreadystatechange = callback;
            resolve[resolve.length - 1].onload = callback;

        })
        .catch(function (e) {
            console.error(e);
        })
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    // script.onreadystatechange = callback;
    // script.onload = callback;
}

document.addEventListener("DOMContentLoaded", () => {
    loadScript(main,
        {src: './js/canvas/Rectangle.js'},
        {src: './js/modal/Modal.js'},
        {src: './js/canvas/Dimensions.js'},
        {src: './js/canvas/Position.js'},
        {src: './js/button/Button.js'},
        {src: './js/create-rectangle-html/createRectangleHtml.js'},
    )
});

const main = () => {
    (function() {
        let height = window.innerHeight;
        let width = window.innerWidth;
        const createRectangleModal = new Modal({html: createRectangleHtml, listeners: listeners});


        const getDimensions = () => {
            height = window.innerHeight;
            width = window.innerWidth;
        }

        const body = document.getElementsByTagName('body')[0];
        body.onresize = () => {
            getDimensions()
        }

        createButton('Create Rectangle', 'is-primary', {click: createRectangleModal.openModal});
        createButton('Destroy Rectangle', 'is-danger');
    })()
}
