import ResizeManager from '../managers/ResizeManager';
import bindAll from '../utils/bindAll';

class EaseGeneratorComponent {
    constructor(options) {
        this.el = options.el;

        this.ui = {
            canvas: this.el.querySelector('.js-canvas')
        }

        this.components = {};

        this._bindAll();
        this._setup();
    }

    tick() {
        
    }

    close() {
        
    }

    _resize(width, height) {
        this._width = width;
        this._height = height;
    }

    _bindAll() {
        bindAll(
            this,
            '_resizeHandler'
        );
    }

    _setup() {
        this._setupEventListeners();
    }

    _setupEventListeners() {
        ResizeManager.addEventListener('resize', this._resizeHandler);
    }

    _resizeHandler(e) {
        const { viewportWidth, viewportHeight } = e;
        this._resize(viewportWidth, viewportHeight);
    }
}

export default EaseGeneratorComponent;