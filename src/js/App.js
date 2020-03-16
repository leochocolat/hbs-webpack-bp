import ComponentFactory from './ComponentFactory';
import SmoothScrollModule from './modules/SmoothScrollModule';

class App {
    constructor() {
        this._setup();
    }

    _setup() {
        this._setupSmoothScroll();
        this._update();
    }

    _setupSmoothScroll() {
        this._smoothScrollModule = new SmoothScrollModule({
            container: document.querySelector('.js-scroll-container'),
            content: document.querySelector('.js-scroll-content'),
            smooth: 0.1
        });
    }

    start() {
        ComponentFactory.start();
    }

    _update() {
        ComponentFactory.update();
        this._smoothScrollModule.update();

        requestAnimationFrame(this._update.bind(this));
    }
}

export default App;