import ComponentFactory from './ComponentFactory';
import bindAll from './utils/bindAll';
import { gsap } from 'gsap';

class App {
    constructor() {
        bindAll(this, '_tickHandler');

        this._setup();
    }

    start(activeView) {
        ComponentFactory.start(activeView);
    }

    close() {
        ComponentFactory.close();
    }

    _setup() {
        this._setupEventListeners();        
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