//css
import './css/app.scss';

//vendors
import barba from '@barba/core';
import { gsap } from 'gsap';

import App from './js/App';
import { transitionIn, transitionOut } from './js/transitions/transition';

const app = new App();

//functions ordered following the lifecycle
barba.init({
    transitions: [{
        name: 'default-transition',
        //leave
        beforeLeave(data) {
            
        },
        leave(data) {
            const done = this.async();
            
            app.close();

            transitionOut(data).then(() => {
                done();
            });
        },
        afterLeave(data) {
            
        },
        //enter
        beforeEnter(data) {
            
        },
        enter(data) {
            const done = this.async();

            transitionIn(data).then(() => {
                done();
            });
        },
        afterEnter(data) {
            
        },
        after(data) {
            console.log('after')
            app.start(data.next.container);
            console.log('after after')
        }
    }]
});