import ComponentFactory from './ComponentFactory';
import bindAll from './utils/bindAll';
import { gsap } from 'gsap';
import ScrollModule from './modules/ScrollModule';

class App {
    constructor() {
        bindAll(this, '_tickHandler');

        this._setup();
    }

    start(activeView) {
        ComponentFactory.start(activeView);
        this._updateScrollModule();
    }

    close() {
        ComponentFactory.close();
    }

    _setup() {
        ComponentFactory.start();
        this._setupSmoothScroll();
        this._setupEventListeners();        
    }

    _setupSmoothScroll() {
        this._smoothScrollModule = new ScrollModule({
            container: document.querySelector('.js-scroll-container'),
            content: document.querySelector('.js-scroll-content'),
            smooth: true,
            smoothValue: 0.15,
        });
    } 
    
    _updateScrollModule() {
        this._smoothScrollModule.updateScroll();
    }

    _update() {
        ComponentFactory.update();
    }

    _setupEventListeners() {
        gsap.ticker.add(this._tickHandler);
    }

    _tickHandler() {
        this._update();
    }
}

export default App;