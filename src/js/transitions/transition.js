import { TimelineLite, Power3 } from 'gsap';

function transitionOut(data) {
    const promise = new Promise(resolve => {
        let timeline = new TimelineLite({ onComplete: resolve });
        timeline.to(data.current.container, 0.5, { autoAlpha: 0, ease: Power3.easeInOut });
        timeline.set(data.current.container, { display: 'none' });
    });

    return promise;
}

function transitionIn(data) {
    const promise = new Promise(resolve => {
        let timeline = new TimelineLite({ onComplete: resolve });
        timeline.from(data.next.container, 0.5, { autoAlpha: 0, ease: Power3.easeInOut });
    });

    return promise;
}

export {
    transitionOut,
    transitionIn
};