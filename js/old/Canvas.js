"use strict";


/**
 *
 * @constructor
 * @param {String} _id = _id from HTML DOM
 * @param {String} name = name of current canvas element
 * @param {'2d' | '3d'} contextType = canvas element instance
 */

const Canvas = (function() {
    // create private field
    let privateStore = {};
    let uid = 0;

    function Canvas(id, name, contextType = '2d', parentElement = `canvas-wrapper` ) {
        privateStore[this.id = uid++] = {};
        privateStore[this.id]._id = id;
        privateStore[this.id]._name = name;
        privateStore[this.id]._contextType = contextType;

        const createDOMCanvas = (id) => {
            const canvas = document.createElement('canvas');
            canvas.id = id;
            const canvasWrapper = document.getElementById(parentElement);
            canvasWrapper.appendChild(canvas);
        }

        /**
         * @param {Number} width
         * @param {Number} height
         * @param {String} backgroundColor  = canvas element instance
         */
        const customizeAppearance =  (width, height, backgroundColor) => {
            privateStore[this.id]._canvas.width = width;
            privateStore[this.id]._canvas.height = height;
            privateStore[this.id]._canvas.style.backgroundColor = backgroundColor;
        }

        createDOMCanvas(id);

        try {
            privateStore[this.id]._canvas = document.getElementById(id);
            customizeAppearance(500, 500, '#0B7A75');
            if (privateStore[this.id]._canvas.getContext) {
                privateStore[this.id]._context = privateStore[this.id]._canvas.getContext(contextType);
            } else {
                console.error('Your browser doesnt support canvas');
            }

        } catch (e) {
            if (e instanceof TypeError) {
                console.error(`There is no element with _id: ${privateStore[this.id]._id}. Please try again`);
            }
            console.error('unexpected error', e);
        }
    }


    Canvas.prototype.getId = function () {
        return privateStore[this.id]._id;
    }

    Canvas.prototype.getName = function () {
        return privateStore[this.id]._name;
    }

    Canvas.prototype.getContextType = function () {
        return privateStore[this.id]._contextType;
    }

    Canvas.prototype.getContext = function () {
        return privateStore[this.id]._context;
    }

    return Canvas;
})();

