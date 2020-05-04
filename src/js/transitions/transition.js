import { TimelineLite } from 'gsap';

function transitionOut(data) {
    const promise = new Promise(resolve => {
        let timeline = new TimelineLite({ onComplete: resolve });
        timeline.to(data.current.container, 1, { autoAlpha: 0 });
        timeline.set(data.current.container, { display: 'none' });
    });

    return promise;
}

function transitionIn(data) {
    const promise = new Promise(resolve => {
        let timeline = new TimelineLite({ onComplete: resolve });
        timeline.fromTo(data.next.container, 1, { autoAlpha: 0 }, { autoAlpha: 1 });
    });

    return promise;
}

export {
    transitionOut,
    transitionIn
};