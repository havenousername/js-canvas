"use strict";

/**
 *
 * @constructor
 * @param {string} canvasId
 * @param {number} x
 * @param {number} y?
 * @param {number} width?
 * @param {number} height?
 */

class Rectangle {
    constructor(canvasId, x, y, width, height) {
        if (canvasId === undefined) {
            throw new Error("No canvasId specified");
        } else if (typeof canvasId !== 'string') {
            throw new TypeError("Wrong canvasId type");
        }

        this._canvas = document.getElementById(canvasId);
        if (this._canvas !== null && this._canvas.getContext) {
            this._2dctx = this._canvas.getContext('2d');
        } else {
            throw new Error('Canvas id is wrong or has no context');
        }

        if (x === undefined) {
            throw new Error("Wrong argument number exception. Please provide at at least three args")
        } else if (y === undefined) {
            console.log('Square created!')
            this._position = new Position(x,x);
            this._dimentions = new Dimensions(x,x);
        } else if (width === undefined) {
            console.log('Rectangle same width and height as dimensions');
            this._position = new Position(x,y);
            this._dimentions = new Dimensions(x,y);
        } else if (height === undefined) {
            console.log('Square with width side created');
            this._position = new Position(x,y);
            this._dimentions = new Dimensions(width, width);
        } else {
            console.log('Reactangle created');
            this._position = new Position(x, y);
            this._dimentions = new Dimensions(width, height);
        }
        this._stroke = 0;
        this._clearStroke = 0;
        this._innerStroke = 0;
    }
    /**
     * @param {number} stroke
     */
    set setStroke(stroke) {
        this._stroke = stroke;
    }

    /**
     * @param {number} stroke
     */
    set setClearStroke(stroke) {
        this._clearStroke = stroke;
    }

    /**
     * @param {number} stroke
     */
    set setInnerStoke(stroke) {
        this._innerStroke = stroke;
    }

    get position() {
        return this._position;
    }

    get dimensions() {
        return this._dimentions;
    }

    get centerPosition() {
        return new Position(this._position.x + this._dimentions.width / 2,  this._position.y + this._dimentions.height / 2);
    }

    draw() {
        const center = this.centerPosition;
        const inverseX = center.x - this._innerStroke;
        const inverseY = center.y - this._innerStroke;

        if (this._stroke > 0) {
            this._2dctx.fillStyle = 'rgb(200, 0, 0)';
            this._2dctx.fillRect(this._position.x - this._stroke, this._position.y - this._stroke, this._dimentions.width + this._stroke * 2,this._dimentions.height + this._stroke * 2 );
        }
        this._2dctx.fillStyle = 'rgb(0,0,0)';
        this._2dctx.fillRect(this._position.x,this._position.y, this._dimentions.width, this._dimentions.height);
        if (this._clearStroke > 0) {
            this._2dctx.clearRect( this._position.x + this._clearStroke,this._position.y + this._clearStroke, this._dimentions.width - this._clearStroke * 2, this._dimentions.height - this._clearStroke * 2);
        }
        if (this._innerStroke) {
            this._2dctx.strokeRect(inverseX, inverseY, this._innerStroke * 2,this._innerStroke * 2);
        }

        console.log('Square was drown');
    }

    undraw() {
        const x = this._stroke > 0 ? this._position.x - this._stroke : this._position.x;
        const y = this._stroke > 0 ? this._position.y - this._stroke : this._position.y;
        const width = this._stroke > 0 ? this._dimentions.width + this._stroke * 2 : this._dimentions.width;
        const height = this._stroke > 0 ? this._dimentions.height + this._stroke * 2 : this._dimentions.height;
        this._2dctx.clearRect(x, y, width, height);
        console.log('Square was undrown');
    }
}
