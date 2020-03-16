import bindAll from '../utils/bindAll';

import ScrollManager from '../managers/ScrollManager';
import ResizeManager from '../managers/ResizeManager';

import { TweenLite } from 'gsap';

class SmoothScrollModule {
    constructor(options) {
        bindAll(
            this,
            '_scrollHandler',
            '_readyStateChangeHandler',
            '_resizeHandler',
            '_resizeEndHandler'
        );

        this.container = options.container;
        this.content = options.content;
        this.smooth = options.smooth;

        this._scroll = {};
        this._previousScroll = {};
        this._offsetY = 0;

        setInterval(() => {
            this._allowContentHeightCheck = true;
        }, 2000);

        this._setup();
    }

    _setup() {
        ScrollManager.enableSmoothScroll();
        ScrollManager.setSmoothValue(this.smooth);

        this.content.style.position = 'fixed';

        this._resize();

        this._setupEventListeners();
    }

    _resize() {
        this._contentHeight = this.content.clientHeight;
        this.container.style.height =  `${this._contentHeight}px`;

        this._setOffset();
    }

    _setOffset() {
        const position = ScrollManager.getPosition();

        const y = this._offsetY + - position.y;

        TweenLite.set(this.content, { y: y });
    }

    _checkContentHeight() {
        const contentheight = this.content.clientHeight;
        if (this._contentheight !== contentheight) {
            this._resize();
        }
    }

    update() {
        if (this._allowContentHeightCheck) {
            this._allowContentHeightCheck = false;
            this._checkContentHeight();
        }
    }

    _setupEventListeners() {
        ScrollManager.addEventListener('scroll', this._scrollHandler);
        ScrollManager.addEventListener('scroll:end', this._scrollEndHandler);

        document.addEventListener('readystatechange', this._readyStateChangeHandler);
        ResizeManager.addEventListener('resize', this._resizeHandler);
        ResizeManager.addEventListener('resize:end', this._resizeEndHandler);
    }

    _scrollHandler(e) {
        this._setOffset();
    }

    _scrollEndHandler(e) {
        this._setOffset();
    }

    _readyStateChangeHandler() {
        this._resize();
    }

    _resizeHandler() {
        //nothing
    }

    _resizeEndHandler() {
        this._resize();
    }
}

export default SmoothScrollModule;