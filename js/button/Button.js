"use strict";

/**
 * @param {string} label
 * @param {'is-primary' | 'is-secondary' | 'is-danger'} type
 */


const createButton = (label,  type ) => {
    if (!label && !type) {
        throw new Error('Argument passing error. Please enter all required parameters(2 in this case)');
    }
    const footer = document.getElementById('footer')
    const button = document.createElement('button');
    button.classList.add('is-button');
    button.classList.add(type);
    button.innerText = label;
    footer.appendChild(button);
}
