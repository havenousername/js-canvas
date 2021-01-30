class Modal {
    constructor(props) {
        if (!props || typeof props !== 'object') {
            throw new Error('No props argument was passed, or it is not an object')
        }
        this._listeners = props.listeners;
        this._modalWrapper = document.createElement('div');
        this._modal = document.createElement('div');
        this._modalGuts = document.createElement('div');
        this._closed = true;

        this._modal.classList.add('modal','closed');
        this._modalWrapper.classList.add('modal-wrapper', 'closed');
        this._modalGuts.classList.add('modal-guts');

        this._modalGuts.innerHTML = props.html;
        this._modal.id = 'modal';
        this._modalWrapper.appendChild(this._modal);
        document.body.appendChild(this._modalWrapper);
        createButton('&#10005;', 'is-close-button', {click: this.closeModal}, 'modal', 'close-button');
        this._modal.appendChild(this._modalGuts);

        document.addEventListener('click', (event) => {
            if (this._modalWrapper.contains(event.target) && !this._modal.contains(event.target)) {
                this.closeModal();
            }
        });
    }
    openModal = () => {
        this._modal.classList.remove('closed');
        this._modalWrapper.classList.remove('closed');
        this._listeners(this);
        this._closed = false;
    }

    get closed() {
        return this._closed;
    }

    closeModal = () => {
        this._closed = true;
        this._modal.classList.add('closed');
        this._modalWrapper.classList.add('closed');
    }

}
