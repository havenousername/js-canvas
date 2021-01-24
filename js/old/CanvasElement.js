"use strict";

/**
 *
 * @constructor
 * @param {CanvasRenderingContext2D} context
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

    function Element(context, xPos, yPos, width, height, strokeSize = 0) {

       if (arguments.length < 4) {
           throw new DOMException("Please provide some arguments for constructor");
       }

        privateStore[this.id = uid++] = {};
        privateStore[this.id]._name = "Canvas Element";
        if (xPos < 0 || yPos < 0 || width < 0 || height < 0) {
            throw new DOMException("No such canvas element can be rendered, cause of faulty arguments values");
        }
        privateStore[this.id]._xPos = xPos;
        privateStore[this.id]._yPos = yPos;
        privateStore[this.id]._width = width;
        privateStore[this.id]._height = height;
        privateStore[this.id]._strokeSize = strokeSize;
        if (context) {
            privateStore[this.id]._ctx = context;
        } else {
            console.error("Please provide appropriate canvas id\n");
        }
    }

    return Element;
})();

