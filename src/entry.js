//vendors
import barba from '@barba/core';
import { gsap } from 'gsap';

import App from './js/App';
import HomeView from './js/views/HomeView';
import { transitionIn, transitionOut } from './js/transitions/transition';

import './css/app.scss';

const app = new App();

app.start();

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
                app.start(data.next.container);
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
        after() {
            
        }
    }]
});