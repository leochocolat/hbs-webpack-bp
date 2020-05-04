import bindAll from '../utils/bindAll';

class AboutComponent {
    constructor(options) {
        this.el = options.el;

        bindAll(this, '_clickHandler');

        this._setup();
    }

    start() {

    }

    close() {
        window.removeEventListener('click', this._clickHandler);
    }

    _setup() {
        this._setupEventListeners();
    }

    _setupEventListeners() {
        // this.el.addEventListener('click', this._clickHandler);
        window.addEventListener('click', this._clickHandler);
    }

    _clickHandler() {
        console.log('click about component')
    }
}

export default AboutComponent;