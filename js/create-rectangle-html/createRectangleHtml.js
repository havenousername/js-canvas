"use strict";

const createRectangleHtml = `
            <div class="create-rectangle-modal is-justify-center is-align-items-center">
            <div>
                <div class="input-item"><span>Position Top: </span><input class="is-input is-float-right" type="number" id="y-input" /></div>
                <div class="input-item"><span>Position Left:  </span> <input class="is-input is-float-right" type="number" id="x-input" /></div>
                <div class="input-item"><span>Width: </span> <input class="is-input is-float-right" type="number" id="width-input" /></div>
                <div class="input-item"><span>Height: </span> <input class="is-input is-float-right" type="number" id="height-input"  /></div>
                <div class="input-item"><span>Stroke: </span> <input class="is-input is-float-right" type="number" id="stroke-input" /></div>
                <div class="input-item"><span>Inner stroke: </span> <input class="is-input is-float-right" type="number" id="inner-input" /></div>
                <div class="input-item"><span>Clearing stroke: </span> <input class="is-input is-float-right" type="number" id="clearstoke-input" /></div>
                <div class="input-item"><span>Background Color </span> <input class="is-input is-float-right" type="color" id="backgroundColor-input" value="#ffffff" /></div>
                <div class="input-item"><span>Border Color </span> <input class="is-input is-float-right" type="color" id="borderColor-input" value="#000000" />
            </div>    
            <button class="is-button is-primary is-small button-modal" id="confirm-creation">
                Confirm creation
            </button>
            </div>
        `;



const listeners = (modal) => {
    function keepCloning(objectPassed) {
        if (objectPassed === null || typeof objectPassed !== 'object') {
            return objectPassed;
        }
        // give temporary-storage the original obj's constructor
        const temporaryStorage = objectPassed.constructor();
        for (const key in objectPassed) {
            temporaryStorage[key] = keepCloning(objectPassed[key]);
        }
        return temporaryStorage;
    }

    const initial = {
        y: 0,
        x: 0,
        width: 0,
        height: 0,
        stroke: 0,
        innerStroke: 0,
        clearStroke: 0,
        backgroundColor: '#000000',
        borderColor: '#000000',
    };
    const currentRectangleProps = keepCloning(initial);
    const inputs = ['x-input', 'y-input', 'width-input', 'height-input', 'stroke-input', 'inner-input', 'clearstoke-input', 'backgroundColor-input', 'borderColor-input']
        .map(i => document.getElementById(i));
    inputs.map(i => i.type === 'color' ? i.value ='#000000' : i.value = 0);
    let rectangle = null;

    const createChangeEventListener = (element, changeTarget, targetElement) => {
        element.addEventListener('input', (event) => {
            if (event.target.value !== changeTarget[targetElement]) {
                changeTarget[targetElement] = !isNaN(event.target.value) ? +event.target.value : event.target.value;
                console.log(changeTarget);
            }
        })
    };

    inputs.map(i => createChangeEventListener(i, currentRectangleProps, i.id.split('-')[0]));
    const button = document.getElementById('confirm-creation');
    button.addEventListener('click', () => {
        modal.closeModal();
        rectangle = new Rectangle('canvas', currentRectangleProps);
        rectangle.draw();
    });

    return rectangle;
};





