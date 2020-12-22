"use strict";

/**
 *
 * @constructor
 * @param {string} canvasId
 * @param {number} xPos
 * @param {number} yPos
 * @param {number} width
 * @param {number} height
 * @param {number} strokeSize?
 */

const CanvasElement = (function () {
    // create private field
    let privateStore = {};
    let uid = 0;

    function CanvasElement(canvasId, xPos, yPos, width, height, strokeSize = 0) {

       if (arguments.length < 4) {
           throw new DOMException("Please provide some arguments for constructor");
       }

        privateStore[this.id = uid++] = {};
        privateStore[this.id]._name = "Canvas Element";
        if (canvasId === null)
        if (xPos < 0 || yPos < 0 || width < 0 || height < 0) {
            throw new DOMException("No such canvas element can be rendered, cause of faulty arguments values");
        }
        privateStore[this.id]._xPos = xPos;
        privateStore[this.id]._yPos = yPos;
        privateStore[this.id]._width = width;
        privateStore[this.id]._height = height;
        privateStore[this.id]._strokeSize = strokeSize;
        const canvas = document.getElementById(canvasId);
        if (canvas.getContext()) {
            privateStore[this.id]._ctx = canvas.getContext('2d');
            draw();
        } else {
            console.error("Please provide appropriate canvas id\n");
        }
    }

    function draw() {
        privateStore[this.id]._ctx.fillRect(privateStore[this.id]._xPos, privateStore[this.id]._yPos, privateStore[this.id]._width, privateStore[this.id]._height);
        privateStore[this.id]._ctx.clearRect(privateStore[this.id]._xPos, privateStore[this.id]._yPos, privateStore[this.id]._width, privateStore[this.id]._height);
        if (privateStore[this.id]._strokeSize > 0) {
            privateStore[this.id]._ctx.strokeRect(privateStore[this.id]._strokeSize, privateStore[this.id]._strokeSize, privateStore[this.id]._strokeSize, privateStore[this.id]._strokeSize);
        }
    }

    return CanvasElement;
})();

