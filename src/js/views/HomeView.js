class HomeView {
    constructor() {
        this.namespace = 'home';
    }

    beforeEnter(data) {
		console.log('enter home', data);
	};
}

export default new HomeView();