const COMPONENTS = {
    'sample': () => import('./components/SampleComponent'),
    'ease-generator': () => import('./components/EaseGeneratorComponent'),
}

class ComponentFactory {
    constructor() {
        this._selector = 'data-component';
        this._components = [];
    }

    start() {
        this._elements = document.querySelectorAll(`[${this._selector}]`);
        for (let i = 0, limit = this._elements.length; i < limit; i++) {
            const element = this._elements[i];
            const componentName = element.getAttribute(this._selector);
            if (COMPONENTS[componentName]) {
                COMPONENTS[componentName]().then((value) => {
                    const component = new value.default({ el: element });
                    this._components.push(component);
                });
            }
            else {
                console.log(`Component: '${componentName}' not found`);
            }
        }
    }

    update() {
        for (let i = 0; i < this._components.length; i++) {
            if (!this._components[i].tick) continue;
            this._components[i].tick(); 
        }
    }

    close() {
        for (let i = 0; i < this._components.length; i++) {
            if (!this._components[i].close) continue;
            this._components[i].close(); 
        }
    }
}

export default new ComponentFactory();

