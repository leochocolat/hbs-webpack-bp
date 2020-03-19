import EventDispatcher from '../events/EventDispatcher';
import ScrollManager from './ScrollManager';
import ResizeManager from './ResizeManager';

import bindAll from '../utils/bindAll';

class ScrollTriggerManager extends EventDispatcher {
    constructor(options) {
        super(options);

        bindAll(
            this,
            '_scrollHandler',
            '_resizeEndHandler'
        );

        this.triggers = [];
    }
    
    /**
     * Public
     */
    start(options) {
        this.el = options.el;
        this._setupTriggers();
        this._detectElements();
        this._setupEventListeners();
    }

    setContentHeight(height) {
        this._contentHeight = height;
        this._updateElements();
    }

    removeEventListeners() {
        ScrollManager.removeEventListeners('scroll', this._scrollHandler);
        ScrollManager.removeEventListeners('scroll:end', this._scrollEndHandler);

        ResizeManager.removeEventListeners('resize:end', this._resizeEndHandler);
    }

    /**
    * Private
    */
    _setupTriggers() {
        const elements = this.el.querySelectorAll('[data-scroll]');

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const className = element.dataset.scrollClass;//not used for now
            const top = element.getBoundingClientRect().top + ScrollManager.getPosition().y;
            const bottom = top + element.offsetHeight;
            const offset = element.dataset.scrollOffset ? parseInt(element.dataset.scrollOffset) : 0;
            const repeat = element.dataset.scrollRepeat;
            const call = element.dataset.scrollCall;

            const trigger = {
                el: element,
                class: className,
                top: top + offset,
                bottom: bottom - offset,
                offset: offset,
                repeat: repeat,
                call: call,
                inView: false
            }

            this.triggers.push(trigger);
        }
    }

    _detectElements() {
        const scrollTop = ScrollManager.getPosition().y;
        const scrollBottom = scrollTop + window.innerHeight;

        for (let i = 0; i < this.triggers.length; i++) {
            const element = this.triggers[i];

            if (!element.inView) {
                if ((scrollBottom >= element.top) && (scrollTop < element.bottom)) {
                    this._setInView(element);
                }
            }

            if (element.inView) {
                if ((scrollBottom < element.top) || (scrollTop > element.bottom)) {
                    this._setOutOfView(element);
                }
            }            
        }
    }

    _setInView(trigger) {
        trigger.inView = true;
        trigger.el.classList.add('isInView');

        if (trigger.call) {
            this._dispatchCallEvent(trigger, 'enter');

            if (trigger.repeat === undefined) {
                trigger.call = false;
            }
        }
    }

    _setOutOfView(trigger) {
        trigger.inView = false;

        if (trigger.call) {
            this._dispatchCallEvent(trigger, 'exit');
        }
        
        if (trigger.repeat) {
            trigger.el.classList.remove('isInView');
        }
    }

    _dispatchCallEvent(trigger, state) {
        const payload = {
            name: trigger.call,
            el: trigger.el,
            state: state
        }

        this.dispatchEvent('call', payload);
    }

    _updateElements() {
        for (let i = 0; i < this.triggers.length; i++) {
            const trigger = this.triggers[i];
            const top = trigger.el.getBoundingClientRect().top + ScrollManager.getPosition().y + trigger.offset;
            const bottom = top + trigger.el.offsetHeight - trigger.offset;

            trigger.top = top;
            trigger.bottom = bottom;
        }
    }

    _setupEventListeners() {
        ScrollManager.addEventListener('scroll', this._scrollHandler);
        ScrollManager.addEventListener('scroll:end', this._scrollEndHandler);

        ResizeManager.addEventListener('resize:end', this._resizeEndHandler);
    }

    _scrollHandler() {
        this._detectElements();
    }

    _scrollEndHandler() {

    }

    _resizeEndHandler() {
        this._updateElements();
    }
}

export default new ScrollTriggerManager();