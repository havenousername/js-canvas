/**
 *
 * @constructor
 * @param {CanvasRenderingContext2D} context
 * @param {number} xPos
 * @param {number} yPos
 * @param {number} side
 * @param {number} strokeSize?
 */

const RectangleElement = (function () {
    // create private field
    let privateStore = {};
    let uid = 0;

    function RectangleElement(context, xPos, yPos, side,strokeSize = 0) {
        CanvasElement.call(this, context, xPos, yPos, side, side, strokeSize);
        console.log('into the rectangle element constructor')

        if (context) {
            draw(context);
        } else {
            console.error("Please provide appropriate canvas id\n");
        }
    }

    function draw (context) {
        const id = uid - 1;
        console.log(context.fillRect)
        context.fillRect(privateStore[id]._xPos, privateStore[id]._yPos, privateStore[id]._width, privateStore[id]._height);
        if (privateStore[id]._strokeSize > 0) {
            context.strokeRect(privateStore[id]._strokeSize, privateStore[id]._strokeSize, privateStore[id]._strokeSize, privateStore[id]._strokeSize);
        }
    }

    return RectangleElement;
})();
