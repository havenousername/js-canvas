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
        {src: './js/canvas/Dimensions.js'},
        {src: './js/canvas/Position.js'},
        {src: './js/button/Button.js'});
});

const main = () => {
    (function() {
        let height = window.innerHeight;
        let width = window.innerWidth;


        const getDimensions = () => {
            height = window.innerHeight;
            width = window.innerWidth;
        }

        const body = document.getElementsByTagName('body')[0];
        body.onresize = () => {
            getDimensions()
        }

        function simpleDraw() {
            const canvas = document.getElementById('canvas');
            canvas.width = width;
            canvas.height = height;

            if (canvas.getContext) {
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = 'rgb(200,0,0)';
                ctx.fillRect(10,10, 50,50);

                ctx.fillStyle = 'rgba(0,0,200, 0.5)';
                ctx.fillRect (30, 30,50,50)
            } else {
                throw new Error("Error. Your browser doesn't support 2d canvas.");
            }
        }
        const square = new Rectangle('canvas', 40);
        console.log(square)
        square.setStroke = 10;
        square.setClearStroke = 10;
        square.setInnerStoke = 10;
        square.draw();
        square.undraw();

        createButton('Create Rectangle', 'is-primary');
        createButton('Destroy Rectangle', 'is-danger');
    })()
}
